// import BestSelling from "@/components/BestSelling";
import Hero from "@/components/Hero";
import OurSpecs from "@/components/OurSpec";
import LatestProducts from "@/components/LatestProducts";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { SITE, SITE_URL } from "@/lib/site";

const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE.name,
    url: SITE_URL,
    email: SITE.email,
    telephone: SITE.phone,
    address: { "@type": "PostalAddress", ...SITE.address },
    sameAs: ["https://www.facebook.com/bitspakistan/"],
}

const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE.name,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/shop?search={search_term_string}`,
        "query-input": "required name=search_term_string",
    },
}

export default function Home() {
    return (
        <div>
            <StructuredData data={[organizationData, websiteData]} />
            <Hero />
            <LatestProducts />
            {/* <BestSelling /> */}
            <OurSpecs />
            <section className="mx-6 my-24" aria-labelledby="storage-help-heading">
                <div className="max-w-6xl mx-auto rounded-3xl border border-slate-200 bg-slate-50 px-6 py-10 sm:px-10">
                    <p className="text-sm font-medium text-green-700">Storage buying help</p>
                    <h2 id="storage-help-heading" className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-800">Choose the right HDD or SSD for your system</h2>
                    <p className="mt-4 max-w-3xl leading-7 text-slate-600">HDDs prioritize high-capacity storage and value, while SSDs prioritize speed, low latency, and quiet operation. Capacity, workload, interface compatibility, and warranty should guide your choice.</p>
                    <Link href="/storage-guide" className="mt-6 inline-flex rounded-md bg-slate-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-900">Read the HDD and SSD guide</Link>
                </div>
            </section>
        </div>
    );
}
