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

// Based on $400 off $2,388 ($199*12), the discount is approx 16.75%
const YEARLY_DISCOUNT_PERCENT = 0.1675;
async function seedStripe() {
  console.log(`Seeding Stripe Products & Prices with ${YEARLY_DISCOUNT_PERCENT * 100}% Yearly Discount...`);

  // 0. Create the "Try SAFR" Coupon for 50% off
  // This will be applied to the 2nd month via our Backend Webhook logic
  try {
    const coupon = await stripe.coupons.create({
      id: "TRY_SAFR_50_OFF",
      name: "1/2 Off 2nd Month",
      percent_off: 50,
      duration: "once", // Applies to a single billing cycle
      metadata: { promotion_type: "new_customer_trial" }
    });
    console.log(`✅ Created Promotion Coupon: ${coupon.id}`);
  } catch (error: any) {
    if (error.code === 'resource_already_exists') {
      console.log("ℹ️ Coupon 'TRY_SAFR_50_OFF' already exists.");
    } else {
      console.error("❌ Failed to create coupon:", error.message);
    }
  }

  for (const tier of tiers) {
...

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

      // 3. Create Yearly Price (Percentage Discount Rule)
      const yearlyFullPrice = tier.price * 12;
      const yearlyDiscountedAmount = Math.floor(yearlyFullPrice * (1 - YEARLY_DISCOUNT_PERCENT));

      const yearlyPrice = await stripe.prices.create({
        product: product.id,
        unit_amount: yearlyDiscountedAmount,
        currency: "usd",
        recurring: { interval: "year" },
        metadata: { 
          tier_id: tier.tier_id,
          discount_applied: `${YEARLY_DISCOUNT_PERCENT * 100}%_OFF_YEARLY` 
        },
      });

      console.log(`✅ Created ${tier.name} (${tier.tier_id})`);
      console.log(`   - Monthly: $${tier.price / 100}`);
      console.log(`   - Yearly:  $${yearlyDiscountedAmount / 100} (Saved $${(yearlyFullPrice - yearlyDiscountedAmount) / 100})`);
    } catch (error: any) {
      console.error(`❌ Failed to create ${tier.name}:`, error.message);
    }
  }

  console.log("Seeding Complete.");
}

seedStripe();
