-- Add stable, human-readable product URLs without breaking existing records.
ALTER TABLE "Product" ADD COLUMN "slug" TEXT;

WITH normalized AS (
    SELECT
        "id",
        COALESCE(
            NULLIF(TRIM(BOTH '-' FROM REGEXP_REPLACE(LOWER("name"), '[^a-z0-9]+', '-', 'g')), ''),
            'product'
        ) AS base_slug,
        ROW_NUMBER() OVER (
            PARTITION BY COALESCE(
                NULLIF(TRIM(BOTH '-' FROM REGEXP_REPLACE(LOWER("name"), '[^a-z0-9]+', '-', 'g')), ''),
                'product'
            )
            ORDER BY "createdAt", "id"
        ) AS duplicate_number
    FROM "Product"
)
UPDATE "Product" AS product
SET "slug" = CASE
    WHEN normalized.duplicate_number = 1 THEN normalized.base_slug
    ELSE normalized.base_slug || '-' || normalized.duplicate_number
END
FROM normalized
WHERE product."id" = normalized."id";

ALTER TABLE "Product" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
