# SAFR Report Stacking & Distribution Logic

## 1. Centralized Library (Storage Efficiency)
- **Concept:** We will store exactly **7 files** per distribution cycle (one for each Tier in the Matrix).
- **Naming:** Files are stored as `reports/{YEAR}/{MONTH}/{YYYY-MM-DD_HHMM}_{TIER_NAME}.md`.
- **Deduplication:** Instead of copying files for each user, the database records the `distributionTimestamp`. A user's access is determined by comparing this timestamp against their `subscriptionHistory`.

## 2. Tier-Based Bundling (User Convenience)
- **Logic:** Each Tier is a "Cumulative Stack."
  - **Level 1 Plus** = Level 1 Core content + Extra Research.
  - **Level 3 Elite** = Everything from Level 1, Level 2, and Level 3 Core + Elite Daily metrics.
- **Implementation:** The `SAFR Distribution Engine` will append Markdown fragments in order of the subscription matrix to create a single, cohesive file for that tier.

## 3. Persistent Historical Access
- **Rule:** A user's right to a report is locked at the moment of distribution. 
- **Scenario:** 
  - User paid for "Elite Alpha" in May.
  - User downgrades to "Level 1 Core" in June.
  - **Result:** The user maintains access to the full "Elite Alpha" reports distributed in May, but can only see "Level 1 Core" reports for June.
- **Technical Check:** 
  ```javascript
  const canAccess = (user, report) => {
    const matchingPeriod = user.subscriptionHistory.find(period => 
      report.distributionTimestamp >= period.startDate && 
      report.distributionTimestamp <= period.endDate &&
      isTierIncluded(period.level, report.bundleTier)
    );
    return !!matchingPeriod;
  }
  ```

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
