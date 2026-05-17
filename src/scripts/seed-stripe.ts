import Stripe from "stripe";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "../../.env.local" });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27" as any,
});

const tiers = [
  { name: "The Safion Regulatory Moat Brief", price: 4900, tier_id: "L1_CORE" },
  { name: "The Safion Regulatory Moat Brief+", price: 9900, tier_id: "L1_PLUS" },
  { name: "The Safion Infrastructure Report", price: 14900, tier_id: "L2_CORE" },
  { name: "The Safion Influencer Hub", price: 19900, tier_id: "INFLUENCER" }, // Track 2
  { name: "The Safion Infrastructure Report+", price: 30000, tier_id: "L2_PLUS" },
  { name: "The Safion Sovereign Alpha Ledger", price: 45000, tier_id: "L3_CORE" },
  { name: "The Safion Sovereign Alpha Ledger+", price: 120000, tier_id: "L3_PLUS" },
  { name: "The Safion Sovereign Daily", price: 300000, tier_id: "ELITE" },
];

async function seedStripe() {
  console.log("Seeding Stripe Products & Prices with $400 Yearly Discount...");

  for (const tier of tiers) {
    try {
      // 1. Create Product
      const product = await stripe.products.create({
        name: tier.name,
        metadata: {
          tier_id: tier.tier_id,
        },
      });

      // 2. Create Monthly Price
      const monthlyPrice = await stripe.prices.create({
        product: product.id,
        unit_amount: tier.price,
        currency: "usd",
        recurring: { interval: "month" },
        metadata: { tier_id: tier.tier_id },
      });

      // 3. Create Yearly Price ($400 Discount Rule)
      // Yearly = (Monthly * 12) - 40,000 cents ($400)
      const yearlyAmount = (tier.price * 12) - 40000;
      
      // Safety check: ensure yearly is positive (for very low tiers)
      const finalYearlyAmount = yearlyAmount > 0 ? yearlyAmount : Math.floor(tier.price * 10);

      const yearlyPrice = await stripe.prices.create({
        product: product.id,
        unit_amount: finalYearlyAmount,
        currency: "usd",
        recurring: { interval: "year" },
        metadata: { 
          tier_id: tier.tier_id,
          discount_applied: "400_OFF_YEARLY" 
        },
      });

      console.log(`✅ Created ${tier.name} (${tier.tier_id})`);
      console.log(`   - Monthly: $${tier.price / 100} (Price ID: ${monthlyPrice.id})`);
      console.log(`   - Yearly:  $${finalYearlyAmount / 100} (Price ID: ${yearlyPrice.id}) - $400 Savings`);
    } catch (error: any) {
      console.error(`❌ Failed to create ${tier.name}:`, error.message);
    }
  }

  console.log("Seeding Complete.");
}

seedStripe();
