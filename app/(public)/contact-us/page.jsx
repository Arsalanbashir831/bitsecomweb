import Link from 'next/link'
import { ArrowUpRight, Check, Clock3, MapPin, MessageCircle, ShieldCheck } from 'lucide-react'
import ContactMotion from '@/components/ContactMotion'
import StructuredData from '@/components/StructuredData'
import { absoluteUrl } from '@/lib/site'

const whatsappUrl = 'https://wa.me/923349922317?text=Hello%20B.I.T.S%20Pakistan%2C%20I%20would%20like%20help%20with%20a%20storage%20product.'

export const metadata = {
    title: 'Contact Us on WhatsApp',
    description: 'Contact B.I.T.S Pakistan on WhatsApp for HDD and SSD product advice, compatibility questions, wholesale enquiries, and warranty assistance.',
    alternates: { canonical: '/contact-us' },
    openGraph: {
        title: 'Contact B.I.T.S Pakistan on WhatsApp',
        description: 'Get help with storage products, compatibility, wholesale orders, and warranty questions.',
        url: '/contact-us',
        type: 'website',
    },
}

const structuredData = [
    {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Contact us', item: absoluteUrl('/contact-us') },
        ],
    },
    {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact B.I.T.S Pakistan',
        url: absoluteUrl('/contact-us'),
        mainEntity: {
            '@type': 'Organization',
            name: 'B.I.T.S Pakistan',
            telephone: '+923349922317',
            contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+923349922317',
                contactType: 'customer service',
                areaServed: 'PK',
                availableLanguage: ['English', 'Urdu'],
            },
        },
    },
]

const details = [
    { icon: Clock3, title: 'Fast assistance', description: 'Send your question anytime. Our team will respond as soon as a representative is available.' },
    { icon: ShieldCheck, title: 'Warranty guidance', description: 'Share your purchase details and drive condition for help starting a warranty enquiry.' },
    { icon: MapPin, title: 'Based in Lahore', description: 'Shop P1-40, IT Tower Plaza, Gulberg III, Lahore, Pakistan.' },
]

export default function ContactPage() {
    return (
        <ContactMotion>
            <main className='mx-4 sm:mx-6'>
                <StructuredData data={structuredData} />
                <div className='mx-auto max-w-7xl py-8 sm:py-12'>
                    <nav aria-label='Breadcrumb' className='mb-8 text-sm text-slate-500'>
                        <Link href='/' className='transition hover:text-slate-900'>Home</Link>
                        <span className='mx-2' aria-hidden='true'>/</span>
                        Contact us
                    </nav>

                    <section className='relative overflow-hidden rounded-[2rem] bg-slate-950 text-white'>
                        <div className='absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(148,163,184,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.08)_1px,transparent_1px)] [background-size:48px_48px]' aria-hidden='true' />
                        <div className='absolute -right-24 -top-24 size-80 rounded-full border border-green-400/20' data-contact-orbit aria-hidden='true' />
                        <div className='absolute right-10 top-10 size-44 rounded-full border border-green-400/15' data-contact-orbit aria-hidden='true' />

                        <div className='relative grid min-h-[650px] items-center gap-12 px-6 py-14 sm:px-12 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-16'>
                            <div>
                                <p className='font-mono text-xs uppercase tracking-[0.22em] text-green-400' data-contact-eyebrow>Direct support / WhatsApp</p>
                                <h1 className='mt-6 max-w-2xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl xl:text-7xl'>
                                    <span className='block overflow-hidden'><span className='block' data-contact-line>Let’s find the</span></span>
                                    <span className='block overflow-hidden'><span className='block text-slate-400' data-contact-line>right storage.</span></span>
                                </h1>
                                <p className='mt-7 max-w-xl text-base leading-7 text-slate-300 sm:text-lg' data-contact-copy>Ask about product availability, system compatibility, wholesale quantities, delivery, or warranty support through a direct WhatsApp conversation.</p>
                                <div className='mt-8 flex flex-wrap gap-3 text-xs text-slate-400' data-contact-copy>
                                    <span className='flex items-center gap-2'><Check className='text-green-400' size={15} /> English and Urdu</span>
                                    <span className='flex items-center gap-2'><Check className='text-green-400' size={15} /> No contact form</span>
                                    <span className='flex items-center gap-2'><Check className='text-green-400' size={15} /> Direct product help</span>
                                </div>
                            </div>

                            <div className='rounded-3xl border border-slate-800 bg-white p-3 text-slate-950 shadow-[0_35px_90px_rgba(0,0,0,.35)]' data-contact-card>
                                <div className='rounded-[1.25rem] bg-[#e8f8ee] p-6 sm:p-8'>
                                    <div className='flex items-center gap-4'>
                                        <span className='flex size-12 items-center justify-center rounded-xl bg-[#25D366] text-white'><MessageCircle size={24} /></span>
                                        <div><p className='font-semibold'>B.I.T.S Pakistan</p><p className='mt-0.5 flex items-center gap-2 text-xs text-green-800'><span className='size-1.5 rounded-full bg-green-500' /> WhatsApp support</p></div>
                                    </div>
                                    <div className='mt-8 rounded-2xl rounded-tl-sm bg-white p-4 text-sm leading-6 text-slate-700 shadow-sm'>Hello! Tell us which drive, capacity, or system you need help with.</div>
                                    <div className='ml-auto mt-4 max-w-[88%] rounded-2xl rounded-tr-sm bg-[#d2f5dd] p-4 text-sm leading-6 text-slate-700'>I’m looking for a reliable drive for my CCTV system.</div>
                                    <a href={whatsappUrl} target='_blank' rel='noopener noreferrer' className='group mt-8 flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#1faa52] px-6 text-sm font-semibold text-white transition hover:bg-[#198f45] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700'>
                                        Start WhatsApp conversation <ArrowUpRight className='transition-transform group-hover:translate-x-1 group-hover:-translate-y-1' size={17} />
                                    </a>
                                    <p className='mt-4 text-center text-xs text-green-900/65'>Opens WhatsApp with a ready-to-send message</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className='grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-3' aria-label='Contact information'>
                        {details.map((detail) => (
                            <div className='bg-white p-7 sm:p-8' key={detail.title} data-contact-detail>
                                <detail.icon className='text-green-600' size={22} />
                                <h2 className='mt-5 font-semibold text-slate-900'>{detail.title}</h2>
                                <p className='mt-3 text-sm leading-6 text-slate-600'>{detail.description}</p>
                            </div>
                        ))}
                    </section>
                </div>
            </main>
        </ContactMotion>
    )
}
