# SAFR Platform: Firestore Database Schema

## 1. `users` Collection
- `uid`: string (Primary Key)
- `email`: string
- `stripeCustomerId`: string
- `subscriptionHistory`: array
  - `level`: string
  - `startDate`: timestamp
  - `endDate`: timestamp
  - `status`: string (active, expired)
- `currentSubscription`: map
  - `level`: string
  - `activeFrom`: timestamp
- `createdAt`: timestamp

## 2. `reports` Collection (The Centralized Library)
- `id`: string (Primary Key)
- `fileName`: string (Format: `YYYY-MM-DD_HHMM_TierName.md`)
- `generationTimestamp`: timestamp
- `distributionTimestamp`: timestamp
- `title`: string (e.g., "The Safion Sovereign Alpha Ledger")
- `bundleTier`: string (Level 1 Core ... Elite Alpha)
- `sri_references`: string[] (Array of all SRI indices included in this bundle)
- `storagePath`: string (Link to Firebase Storage file)
- `status`: string (draft, approved, distributed)
- `contentJson`: map (Raw data fragments used to build the bundle - for internal auditing)

## 3. `approval_queue` Collection (HITL)
- `id`: string (Primary Key)
- `bundleGroupId`: string (UUID grouping the 7 tier bundles for a single cycle)
- `tier`: string
- `status`: string (pending, approved, rejected)
- `contentPreview`: string (Markdown)
- `requestedAt`: timestamp
- `actionedAt`: timestamp

## 4. `access_logs` Collection
- `id`: string
- `uid`: string (User)
- `reportId`: string
- `accessedAt`: timestamp
- `action`: string (view, download)


## 4. `leads` Collection
- `id`: string (Primary Key)
- `source`: string (e.g., "Phase 0 Ingestion")
- `rawData`: map (PII included, to be scrubbed)
- `cleanedData`: map (PII removed, sentiment distilled)
- `metrics`: string[] (e.g., XLS-66 APY Analysis)
- `status`: string (ingested, cleaned, processed)
- `processedAt`: timestamp

## 5. `system_config` Collection (Global State)
- `id`: "global"
- `activeModel`: string
- `maintenanceMode`: boolean
- `truthThreshold`: number (default: 0.75)
