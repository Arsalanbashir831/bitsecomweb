export const PRODUCT_CATEGORIES = ["HDD", "SSD"]

export const PRODUCT_BRANDS = ["Seagate", "WD", "HGST", "Mixed"]

export const STORAGE_SIZES = [
    "160 GB",
    "250 GB",
    "256 GB",
    "320 GB",
    "500 GB",
    "512 GB",
    "1 TB",
    "2 TB",
    "3 TB",
    "4 TB",
    "6 TB",
    "8 TB",
    "10 TB",
    "12 TB",
    "14 TB",
]

export const isProductCategory = (value) => PRODUCT_CATEGORIES.includes(value)
export const isProductBrand = (value) => PRODUCT_BRANDS.includes(value)
export const isStorageSize = (value) => STORAGE_SIZES.includes(value)
