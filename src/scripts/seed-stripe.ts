import Stripe from "stripe";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "../../.env.local" });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27" as any,
});

const tiers = [
  { name: "The Safion Regulatory Moat Brief", price: 4900, interval: "month", tier_id: "L1_CORE" },
  { name: "The Safion Regulatory Moat Brief+", price: 9900, interval: "month", tier_id: "L1_PLUS" },
  { name: "The Safion Infrastructure Report", price: 14900, interval: "month", tier_id: "L2_CORE" },
  { name: "The Safion Infrastructure Report+", price: 30000, interval: "month", tier_id: "L2_PLUS" },
  { name: "The Safion Sovereign Alpha Ledger", price: 45000, interval: "month", tier_id: "L3_CORE" },
  { name: "The Safion Sovereign Alpha Ledger+", price: 120000, interval: "month", tier_id: "L3_PLUS" },
  { name: "The Safion Sovereign Daily", price: 300000, interval: "month", tier_id: "ELITE" },
];

async function seedStripe() {
  console.log("Seeding Stripe Products in Sandbox...");

  for (const tier of tiers) {
    try {
      const product = await stripe.products.create({
        name: tier.name,
        metadata: {
          tier_id: tier.tier_id,
        },
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: tier.price,
        currency: "usd",
        recurring: {
          interval: tier.interval as Stripe.Price.Recurring.Interval,
        },
        metadata: {
          tier_id: tier.tier_id,
        },
      });

      console.log(`✅ Created ${tier.name} (${tier.tier_id}) - Price ID: ${price.id}`);
    } catch (error: any) {
      console.error(`❌ Failed to create ${tier.name}:`, error.message);
    }
  }

  console.log("Seeding Complete.");
}

seedStripe();
