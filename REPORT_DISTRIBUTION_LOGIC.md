# SAFR Report Stacking & Distribution Logic

## 1. Centralized Library (Storage Efficiency)
- **Concept:** We will store exactly **7 files** per distribution cycle (one for each Tier in the Matrix).
- **Naming:** Files are stored as `reports/{YEAR}/{MONTH}/{YYYY-MM-DD_HHMM}_{TIER_NAME}.md`.
- **Deduplication:** Instead of copying files for each user, the database records the `distributionTimestamp`. A user's access is determined by comparing this timestamp against their `subscriptionHistory`.

## 2. Tier-Based Bundling (User Convenience)
- **Logic:** Each Tier is a "Cumulative Stack."
  - **Level 1 Plus** = Level 1 Core content + Extra Research.
  - **Level 3 Elite** = Everything from Level 1, Level 2, and Level 3 Core + Elite Daily metrics.
- **Track 2: Influencer Media Kit (The Masked Layer):**
  - **Source:** Generated directly from the **Level 1 Core** and **Level 1 Plus** content.
  - **Masking Protocol:** The system automatically identifies all Safion Reference Identifiers (SRIs) and internal forensic jargon, replacing them with broad-market context links (e.g., Congress.gov, Bloomberg, etc.).
  - **Compliance:** This ensures influencers receive high-value facts without gaining access to the proprietary SRI indexing system reserved for premium Track 1 subscribers.

## 3. Persistent Historical Access
- **Rule:** A user's right to a report is locked at the moment of distribution. 
- **Staff/Guest Access (INTERNAL_ELITE):**
  - Users assigned the `INTERNAL_ELITE` tier (typically via Admin override) gain **unrestricted access** to all reports across all historical dates, regardless of distribution time.
  - This tier automatically "unpacks" the highest available bundle (Elite Alpha).
- **Scenario:** 
  - User paid for "Elite Alpha" in May.
  - User downgrades to "Level 1 Core" in June.
  - **Result:** The user maintains access to the full "Elite Alpha" reports distributed in May, but can only see "Level 1 Core" reports for June.

## 4. Dual-Timestamp Headers
Every report will now include a standardized metadata header:
```markdown
---
REPORT_TITLE: The Safion Sovereign Alpha Ledger
GENERATION_TIME: 2026-05-16 15:44:02 UTC
DISTRIBUTION_TIME: 2026-05-16 16:00:00 UTC
SRI_AUTH_INDEX: SRI-SYNTH-XRP-2026-M0516
---
```

## 5. Truth Threshold & Error Correction (The 3-Attempt Rule)
To prevent "Time to Release" bottlenecks while maintaining >75% certainty:
1.  **Detection:** If a GEM vector analysis returns <75% confidence due to missing evidence, the system flags the specific data gap.
2.  **Targeted Re-scrape & Retry Delay:** The system triggers a targeted scan of related public sources (PACER, SEC, etc.).
    *   **Max Attempts:** 3.
    *   **Retry Interval:** Mandatory **10-minute delay** between attempts to allow external sources (Government faxes, server syncs) to complete their uploads.
3.  **Conflict Resolution (The "Clean or Flag" Rule):** If the threshold is still not met after the 3rd attempt, the system presents two options for the HITL review:
    *   **Option A (Flagging):** Retain the section but explicitly label it as "Inconclusive - Further Research Required by Client."
    *   **Option B (Surgical Pruning):** Isolate the specific inconclusive data/text and remove only the conflicting segments. The system must automatically refactor the surrounding text to ensure the presentation remains professional, understandable, and free of gaps.
4.  **Finality:** Once the Auditor (Rex) chooses the resolution, the report is finalized for approval.
