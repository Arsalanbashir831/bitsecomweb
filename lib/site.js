export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://gocart-omega-nine.vercel.app").replace(/\/$/, "")

export const SITE = {
    name: "B.I.T.S Pakistan",
    shortName: "B.I.T.S",
    description: "HDD and SSD storage drives from Seagate, WD, HGST, and mixed brands, supplied across Pakistan.",
    email: "bitsinfotec@gmail.com",
    phone: "+923349922317",
    address: {
        streetAddress: "Shop P1-40, IT Tower Plaza, Gulberg III",
        addressLocality: "Lahore",
        addressCountry: "PK",
    },
}

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
