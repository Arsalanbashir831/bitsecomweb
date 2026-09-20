import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import ProductsLoader from "@/components/ProductsLoader";
import "./globals.css";
import { SITE, SITE_URL } from "@/lib/site";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "B.I.T.S Pakistan | HDD and SSD Storage",
        template: "%s | B.I.T.S Pakistan",
    },
    description: SITE.description,
    applicationName: SITE.name,
    authors: [{ name: SITE.name, url: SITE_URL }],
    creator: SITE.name,
    publisher: SITE.name,
    category: "Storage hardware",
    keywords: ["HDD Pakistan", "SSD Pakistan", "hard drive Lahore", "Seagate HDD", "WD hard drive", "HGST hard drive", "CCTV storage", "DVR hard drive", "NVR hard drive"],
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        locale: "en_PK",
        url: SITE_URL,
        siteName: SITE.name,
        title: "B.I.T.S Pakistan | HDD and SSD Storage",
        description: SITE.description,
    },
    twitter: {
        card: "summary",
        title: "B.I.T.S Pakistan | HDD and SSD Storage",
        description: SITE.description,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${outfit.className} antialiased`}>
                <StoreProvider>
                    <ProductsLoader />
                    <Toaster />
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}
