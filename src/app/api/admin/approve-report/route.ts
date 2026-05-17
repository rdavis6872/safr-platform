import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { bundleGroupId, action, reviewerNotes } = await req.json();

    if (action !== "approve" && action !== "reject") {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const batch = adminDb.batch();
    const now = new Date();

    // 1. Update the Approval Queue entries for this group
    const queueQuery = await adminDb.collection("approval_queue")
      .where("bundleGroupId", "==", bundleGroupId)
      .get();

    if (queueQuery.empty) {
      return NextResponse.json({ error: "Bundle group not found" }, { status: 404 });
    }

    queueQuery.docs.forEach(doc => {
      batch.update(doc.ref, {
        status: action === "approve" ? "approved" : "rejected",
        reviewerNotes: reviewerNotes || "",
        actionedAt: now
      });
    });

    // 2. If approved, update the reports to 'distributed' and set the timestamp
    if (action === "approve") {
      const reportsQuery = await adminDb.collection("reports")
        .where("bundleGroupId", "==", bundleGroupId) // Note: I should add bundleGroupId to the reports schema too
        .get();

      reportsQuery.docs.forEach(doc => {
        batch.update(doc.ref, {
          status: "distributed",
          distributionTimestamp: now
        });
      });
    }

    await batch.commit();

    return NextResponse.json({ success: true, action });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
