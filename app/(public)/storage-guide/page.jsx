import Link from "next/link"
import StructuredData from "@/components/StructuredData"
import { absoluteUrl } from "@/lib/site"

export const metadata = {
    title: "HDD vs SSD Buying Guide for Pakistan",
    description: "Compare HDD and SSD storage, understand capacity and warranty, and choose a drive for CCTV, DVR, NVR, desktop, or laptop use.",
    alternates: { canonical: "/storage-guide" },
    openGraph: {
        title: "HDD vs SSD Buying Guide for Pakistan",
        description: "A practical guide to storage type, capacity, compatibility, workload, and warranty.",
        url: "/storage-guide",
        type: "article",
    },
}

const faqItems = [
    ["What is the main difference between an HDD and an SSD?", "An HDD stores data on spinning magnetic disks. An SSD uses flash memory, so it usually starts applications faster, operates silently, and better resists movement."],
    ["Should I buy an HDD or SSD for CCTV recording?", "Choose a drive rated for continuous surveillance workloads and confirm DVR or NVR compatibility. Capacity needs depend on camera count, resolution, frame rate, compression, and retention period."],
    ["How much storage capacity do I need?", "Estimate the data created by your applications or cameras, multiply it by the required retention period, then include spare capacity for growth and normal system operation."],
    ["Is an SSD always better than an HDD?", "No. SSDs suit speed-sensitive systems, while HDDs often suit economical high-capacity storage. The better choice depends on workload, budget, capacity, interface, and expected write volume."],
    ["What HDD or SSD brands are available?", "B.I.T.S Pakistan lists available drives from Seagate, WD, HGST, and mixed-brand stock. Each product page identifies its brand, capacity, warranty, price, and current availability."],
    ["What storage capacities can I shop for?", "The catalogue supports capacities from 160 GB through 14 TB. Actual availability changes with inventory, so check the product listing before placing an order."],
    ["What does the product warranty cover?", "The warranty period is shown in months on each product page. Confirm the applicable terms, claim process, and exclusions with B.I.T.S Pakistan before purchasing."],
    ["How do I check whether a drive is compatible?", "Match the drive interface, physical size, capacity limit, and workload rating to the system manufacturer’s specifications. Contact the store when the model requirements are unclear."],
    ["Can I use a desktop HDD in a DVR or NVR?", "A compatible desktop drive may function, but surveillance systems benefit from drives designed for continuous recording. Verify workload rating, heat conditions, supported capacity, and recorder compatibility."],
    ["What should I check before replacing a laptop drive?", "Check whether the laptop accepts a 2.5-inch SATA drive, an M.2 SATA drive, or an NVMe SSD. Also confirm supported dimensions, capacity, and operating-system migration needs."],
    ["Does more storage make a computer faster?", "Capacity alone does not determine speed. Drive technology, interface, controller, cache, workload, available free space, and the rest of the system all affect performance."],
    ["Why is usable drive capacity lower than the advertised capacity?", "Drive makers and operating systems can calculate units differently, and formatting or system partitions use some space. The displayed usable capacity is therefore normally lower."],
    ["Do SSDs need free space?", "Keeping free space helps an SSD manage background operations and accommodates system growth. The appropriate reserve depends on the drive, operating system, and workload."],
    ["How should I protect important data?", "Keep independent backups instead of relying on a single drive. Test restores periodically and separate at least one backup from the main computer or recording system."],
    ["Does B.I.T.S Pakistan provide data recovery?", "Data recovery enquiries are handled through Disk Analysis Pakistan. Use the Data Recovery Service link to visit diskanalysis.com.pk for service information and contact details."],
]

const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
    })),
}

const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Storage guide", item: absoluteUrl("/storage-guide") },
    ],
}

export default function StorageGuidePage() {
    return (
        <main className="mx-6">
            <StructuredData data={[faqData, breadcrumbData]} />
            <article className="max-w-4xl mx-auto py-12 sm:py-16">
                <nav aria-label="Breadcrumb" className="text-sm text-slate-500"><Link href="/">Home</Link> <span aria-hidden="true">/</span> Storage guide</nav>
                <header className="mt-8 border-b border-slate-200 pb-10">
                    <p className="text-sm font-medium text-green-700">Storage buying guide</p>
                    <h1 className="mt-3 text-3xl sm:text-5xl font-semibold leading-tight text-slate-900">How to choose between an HDD and SSD</h1>
                    <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Choose an HDD for economical high-capacity storage or an SSD for faster access and silent operation. Always match capacity, interface, physical size, workload, and warranty to your system.</p>
                    <p className="mt-4 text-sm text-slate-500">Last updated: 21 September 2026</p>
                </header>

                <section className="py-10" aria-labelledby="comparison-heading">
                    <h2 id="comparison-heading" className="text-2xl font-semibold text-slate-900">HDD and SSD comparison</h2>
                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full min-w-xl border-collapse text-left text-sm">
                            <thead><tr className="border-b border-slate-300"><th className="py-3 pr-5">Factor</th><th className="py-3 pr-5">HDD</th><th className="py-3">SSD</th></tr></thead>
                            <tbody className="text-slate-600">
                                <tr className="border-b border-slate-200"><th className="py-4 pr-5 font-medium text-slate-800">Best fit</th><td className="py-4 pr-5">High-capacity storage and recording</td><td className="py-4">Fast boot, application, and file access</td></tr>
                                <tr className="border-b border-slate-200"><th className="py-4 pr-5 font-medium text-slate-800">Moving parts</th><td className="py-4 pr-5">Yes</td><td className="py-4">No</td></tr>
                                <tr className="border-b border-slate-200"><th className="py-4 pr-5 font-medium text-slate-800">Operating sound</th><td className="py-4 pr-5">Audible during operation</td><td className="py-4">Silent</td></tr>
                                <tr><th className="py-4 pr-5 font-medium text-slate-800">Selection priority</th><td className="py-4 pr-5">Capacity and workload rating</td><td className="py-4">Interface, speed, and endurance</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <Link href="/shop" className="mt-8 inline-flex rounded-md bg-slate-800 px-6 py-3 text-sm font-medium text-white hover:bg-slate-900">Browse available drives</Link>
                </section>

                <section className="border-t border-slate-200 py-10" aria-labelledby="faq-heading">
                    <h2 id="faq-heading" className="text-2xl font-semibold text-slate-900">HDD and SSD questions</h2>
                    <div className="mt-6 divide-y divide-slate-200">
                        {faqItems.map(([question, answer], index) => (
                            <details id={`question-${index + 1}`} key={question} className="group scroll-mt-24 py-5">
                                <summary className="cursor-pointer list-none pr-8 font-medium text-slate-900">{question}</summary>
                                <p className="mt-3 max-w-3xl leading-7 text-slate-600">{answer}</p>
                            </details>
                        ))}
                    </div>
                </section>
            </article>
        </main>
    )
}
