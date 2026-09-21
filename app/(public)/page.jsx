// import BestSelling from "@/components/BestSelling";
import Hero from "@/components/Hero";
import OurSpecs from "@/components/OurSpec";
import LatestProducts from "@/components/LatestProducts";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { SITE, SITE_URL } from "@/lib/site";
import HomeMotion from "@/components/HomeMotion";

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
        <HomeMotion>
            <StructuredData data={[organizationData, websiteData]} />
            <Hero />
            <LatestProducts />
            {/* <BestSelling /> */}
            <OurSpecs />
            <section className="mx-6 my-24 sm:my-32" aria-labelledby="storage-help-heading" data-reveal-section>
                <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 text-white sm:px-12 sm:py-16">
                    <div className="absolute -right-24 -top-32 size-80 rounded-full border border-green-400/20" aria-hidden="true" />
                    <div className="absolute -right-10 -top-20 size-52 rounded-full border border-green-400/20" aria-hidden="true" />
                    <div className="relative max-w-3xl" data-section-heading>
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-green-400">Storage buying help / 01</p>
                        <h2 id="storage-help-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">The right drive starts with the right workload.</h2>
                        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">HDDs prioritize high-capacity storage and value, while SSDs prioritize speed, low latency, and quiet operation. Capacity, workload, interface compatibility, and warranty should guide your choice.</p>
                        <Link href="/storage-guide" className="mt-8 inline-flex min-h-12 items-center rounded-md bg-green-400 px-6 text-sm font-semibold text-slate-950 transition hover:bg-green-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-400">Read the HDD and SSD guide</Link>
                    </div>
                </div>
            </section>
        </HomeMotion>
    );
}
