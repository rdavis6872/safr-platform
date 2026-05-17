# SAFR Production Schedule & Operations

**Status:** VMF-4 & VMF-1 Engaged
**Governance:** SAFR_Master_Index.md, SAFR_Reporting_Tiers.md

## I. Weekly Production Chronology (Level 1 & Level 2 Tiers)
**Target Delivery:** Monday Morning, 06:00 AM EST.
**Production Window:** Sunday Night.

*   **08:00 PM EST:** Ingest, Purge PII, and Filter Rumors (Vault Shield). Captures weekend judicial dockets, Federal Register adjustments, and 48 hours of baseline weekend on-chain telemetry.
*   **09:00 PM EST:** Apply 75%+ Cross-Gem Truth Thresholds.
*   **10:00 PM EST:** Compile Core and Plus Reports (SRI-Encoded).
*   **11:00 PM EST:** Run Masking Method to Auto-Generate Influencer Kits.
*   **11:30 PM EST:** Final Manual Audit (HITL) & Scheduler Stage (Queued for 06:00 AM EST).

## II. Monthly Production Chronology (Level 3 Sovereign Alpha)
**Target Delivery:** First Tuesday of the month, 08:00 AM EST.
**Production Window:** First Monday of the month (06:00 PM EST - 11:00 PM EST).
*   **Reasoning:** Captures Month-End Data Sets from traditional financial clearinghouses and central banks published on the first Monday. Protects Macro Clarity by evaluating how traditional treasuries responded to weekend structural shifts during their first full day of weekday trading.

## III. Core System Automation Rule: Ingestion Token Delay
**⚙️ Mandatory Constraint:** The live system scheduler MUST freeze report compilation at least **60 minutes prior to distribution**.
*   **Purpose:** Creates a mandatory lock-out period where no new raw text can enter the inference engine.
*   **Action:** Allows the system to run a final compliance audit via `SAFR_Vault_Shield.md` to guarantee zero PII or unverified speculative noise leaks into any subscriber's delivery queue.
