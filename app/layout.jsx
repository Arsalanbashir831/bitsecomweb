import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import ProductsLoader from "@/components/ProductsLoader";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://gocart-omega-nine.vercel.app"),
    title: {
        default: "B.I.T.S Pakistan | HDD and SSD Storage",
        template: "%s | B.I.T.S Pakistan",
    },
    description: "Shop HDD and SSD storage drives from Seagate, WD, HGST, and mixed brands in Pakistan.",
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
