ALTER TABLE "Product"
    DROP COLUMN "mrp",
    ADD COLUMN "brand" TEXT NOT NULL DEFAULT 'Mixed',
    ADD COLUMN "storageSize" TEXT NOT NULL DEFAULT '1 TB',
    ADD COLUMN "warrantyMonths" INTEGER NOT NULL DEFAULT 12,
    ALTER COLUMN "storeId" DROP NOT NULL;

ALTER TABLE "Product" DROP CONSTRAINT "Product_storeId_fkey";

ALTER TABLE "Product"
    ADD CONSTRAINT "Product_storeId_fkey"
    FOREIGN KEY ("storeId") REFERENCES "Store"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
