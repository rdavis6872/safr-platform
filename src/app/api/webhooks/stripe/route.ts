import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import * as admin from "firebase-admin";
import { adminDb } from "@/lib/firebase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27" as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      await handleSubscriptionChange(session.customer as string, session.metadata?.tier as string);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleSubscriptionChange(customerId: string, tierName: string) {
  const userQuery = await adminDb.collection("users").where("stripeCustomerId", "==", customerId).limit(1).get();
  
  if (!userQuery.empty) {
    const userDoc = userQuery.docs[0];
    const now = new Date();
    
    await userDoc.ref.update({
      "currentSubscription.level": tierName,
      "currentSubscription.activeFrom": now,
      subscriptionHistory: admin.firestore.FieldValue.arrayUnion({
        level: tierName,
        startDate: now,
        status: "active"
      })
    });
  }
}
