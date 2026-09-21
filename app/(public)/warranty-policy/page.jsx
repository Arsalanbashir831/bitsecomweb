import Link from "next/link"
import StructuredData from "@/components/StructuredData"
import { absoluteUrl } from "@/lib/site"

export const metadata = {
    title: "Warranty Policy",
    description: "Read the B.I.T.S Pakistan hard drive warranty coverage, exclusions, replacement conditions, Bill Back terms, and data recovery distinction.",
    alternates: { canonical: "/warranty-policy" },
    openGraph: {
        title: "Warranty Policy | B.I.T.S Pakistan",
        description: "Hard drive warranty coverage, exclusions, replacement conditions, and data recovery terms from B.I.T.S Pakistan.",
        url: "/warranty-policy",
        type: "article",
    },
}

const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Warranty policy", item: absoluteUrl("/warranty-policy") },
    ],
}

const coverageItems = [
    "Low health status of the hard drive",
    "Bad sectors",
    "Slow performance or speed degradation",
    "HDD not detecting or dead drive",
]

const exclusionItems = [
    "Burnt components or signs of electrical damage",
    "Tampering with the HDD",
    "Removal of or damage to HDD stickers or labels",
    "Any form of physical damage",
    "Data loss",
    "Data recovery services",
]

const conditionItems = [
    <>B.I.T.S Pakistan is <strong>not responsible for verbal commitments or promises</strong> made by staff representatives.</>,
    <>Any replacement is <strong>subject to inspection and approval by the technical team</strong>.</>,
    <>The quoted price is valid for <strong>one (1) day only</strong>.</>,
    <>Replacement with the same model or specification depends on <strong>stock availability</strong>.</>,
    <>If the same HDD specification is unavailable, the <strong>Bill Back</strong> option may apply according to the stated conditions.</>,
]

function PolicyList({ items, tone = "neutral" }) {
    const markerClass = tone === "covered" ? "bg-green-600" : tone === "excluded" ? "bg-amber-500" : "bg-slate-400"

    return (
        <ul className="mt-6 space-y-4">
            {items.map((item, index) => (
                <li key={index} className="flex gap-4 text-slate-600">
                    <span className={`mt-2.5 size-1.5 shrink-0 rounded-full ${markerClass}`} aria-hidden="true" />
                    <span className="leading-7">{item}</span>
                </li>
            ))}
        </ul>
    )
}

export default function WarrantyPolicyPage() {
    return (
        <main className="mx-6">
            <StructuredData data={breadcrumbData} />
            <article className="mx-auto max-w-4xl py-12 sm:py-16">
                <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
                    <Link href="/" className="hover:text-slate-800">Home</Link>
                    <span className="mx-2" aria-hidden="true">/</span>
                    Warranty policy
                </nav>

                <header className="mt-8 border-b border-slate-200 pb-10">
                    <p className="text-sm font-medium text-green-700">B.I.T.S Pakistan customer policy</p>
                    <h1 className="mt-3 text-3xl font-semibold leading-tight text-slate-900 sm:text-5xl">Warranty policy</h1>
                    <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                        Our hard drives are classified as <strong className="font-semibold text-slate-800">New Auction Lot (A+) Prime Pulled HDDs</strong>, sourced directly from the original supplier. These drives are not refurbished or repaired.
                    </p>
                    <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                        Depending on the product and applicable conditions, B.I.T.S Pakistan offers up to two years of replacement warranty or Bill Back, subject to availability of the same HDD specification.
                    </p>
                    <p className="mt-5 text-sm text-slate-500">Last updated: 21 September 2026</p>
                </header>

                <div className="grid gap-8 py-10 md:grid-cols-2">
                    <section className="rounded-xl border border-green-200 bg-green-50/60 p-6 sm:p-8" aria-labelledby="coverage-heading">
                        <p className="text-xs font-semibold uppercase tracking-widest text-green-700">Covered</p>
                        <h2 id="coverage-heading" className="mt-2 text-2xl font-semibold text-slate-900">Warranty coverage</h2>
                        <PolicyList items={coverageItems} tone="covered" />
                    </section>

                    <section className="rounded-xl border border-amber-200 bg-amber-50/60 p-6 sm:p-8" aria-labelledby="exclusions-heading">
                        <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Not covered</p>
                        <h2 id="exclusions-heading" className="mt-2 text-2xl font-semibold text-slate-900">Warranty exclusions</h2>
                        <PolicyList items={exclusionItems} tone="excluded" />
                    </section>
                </div>

                <section className="border-t border-slate-200 py-10" aria-labelledby="conditions-heading">
                    <h2 id="conditions-heading" className="text-2xl font-semibold text-slate-900">Important warranty conditions</h2>
                    <p className="mt-3 max-w-3xl leading-7 text-slate-600">All warranty claims and replacements are governed by the following conditions.</p>
                    <PolicyList items={conditionItems} />
                </section>

                <section className="border-t border-slate-200 py-10" aria-labelledby="data-recovery-heading">
                    <div className="rounded-xl bg-slate-900 p-6 text-white sm:p-8">
                        <p className="text-xs font-semibold uppercase tracking-widest text-green-400">Important distinction</p>
                        <h2 id="data-recovery-heading" className="mt-2 text-2xl font-semibold">HDD warranty and data recovery are separate services</h2>
                        <p className="mt-5 leading-7 text-slate-300">
                            The warranty may cover qualifying hardware faults, but it does not cover the customer’s data or the cost of recovering lost data.
                        </p>
                        <p className="mt-4 leading-7 text-slate-300">
                            The separate <strong className="font-semibold text-white">“No Data – No Cost”</strong> principle for data recovery means the customer pays the recovery service fee only when recovery is successful. Diagnosis charges, donor parts, transfer media, shipping, and other applicable costs may still be handled separately under the data-recovery terms.
                        </p>
                        <a href="https://diskanalyst.com.pk/" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-md bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                            View data recovery service
                        </a>
                    </div>
                </section>

                <section className="border-t border-slate-200 pt-10" aria-labelledby="help-heading">
                    <h2 id="help-heading" className="text-2xl font-semibold text-slate-900">Need help with a warranty claim?</h2>
                    <p className="mt-3 max-w-3xl leading-7 text-slate-600">Contact B.I.T.S Pakistan with your purchase details and the drive’s current condition. All claims remain subject to technical inspection.</p>
                    <a href="mailto:bitsinfotec@gmail.com" className="mt-6 inline-flex rounded-md bg-slate-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800">Contact B.I.T.S Pakistan</a>
                </section>
            </article>
        </main>
    )
}
