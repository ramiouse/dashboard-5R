-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- CreateIndex
CREATE INDEX "Asset_location_idx" ON "Asset"("location");

-- CreateIndex
CREATE INDEX "Asset_date_idx" ON "Asset"("date");

-- CreateIndex
CREATE INDEX "Asset_name_trgm_idx" ON "Asset" USING GIN ("name" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "Asset_assetNo_trgm_idx" ON "Asset" USING GIN ("assetNo" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "Asset_note_trgm_idx" ON "Asset" USING GIN ("note" gin_trgm_ops);
