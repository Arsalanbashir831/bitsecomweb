import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check, Headphones } from 'lucide-react'
import { assets, ourSpecsData } from '@/assets/assets'
import Title from './Title'

const visualThemes = [
    {
        panel: 'bg-[#dff8e8]',
        accent: 'bg-green-500',
        content: (
            <div className='relative flex h-full items-end justify-center overflow-hidden px-6 pt-10 sm:px-10'>
                <div className='absolute left-7 top-7 rounded-full border border-green-800/15 bg-white/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-green-900'>Replacement coverage</div>
                <div className='absolute right-8 top-20 size-40 rounded-full border border-green-900/10 sm:size-56' aria-hidden='true' />
                <Image className='relative z-[1] w-[92%] max-w-md translate-y-[6%] object-contain drop-shadow-[0_28px_35px_rgba(15,23,42,.22)]' src={assets.hero_model_img} alt='Surveillance hard drives covered by B.I.T.S Pakistan warranty' />
            </div>
        ),
    },
    {
        panel: 'bg-[#fff0dc]',
        accent: 'bg-orange-500',
        content: (
            <div className='relative flex h-full items-center justify-center overflow-hidden p-8 sm:p-12'>
                <div className='absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(120,53,15,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(120,53,15,.12)_1px,transparent_1px)] [background-size:32px_32px]' aria-hidden='true' />
                <div className='relative w-full max-w-sm rounded-2xl border border-orange-900/15 bg-white p-5 shadow-[0_24px_70px_rgba(120,53,15,.15)]'>
                    <div className='flex items-center justify-between border-b border-slate-100 pb-4'>
                        <div><p className='font-mono text-[10px] uppercase tracking-widest text-slate-400'>Drive report</p><p className='mt-1 text-sm font-semibold text-slate-900'>Physical + health check</p></div>
                        <span className='flex size-9 items-center justify-center rounded-full bg-green-100 text-green-700'><Check size={18} strokeWidth={2.5} /></span>
                    </div>
                    <div className='mt-5 space-y-4 text-xs'>
                        {[['Health status', 'Verified'], ['Bad sectors', 'Checked'], ['Physical condition', 'Inspected']].map(([label, value]) => (
                            <div className='flex items-center justify-between' key={label}><span className='text-slate-500'>{label}</span><span className='font-medium text-slate-900'>{value}</span></div>
                        ))}
                    </div>
                    <div className='mt-6 h-1.5 overflow-hidden rounded-full bg-slate-100'><div className='h-full w-full rounded-full bg-orange-500' /></div>
                </div>
            </div>
        ),
    },
    {
        panel: 'bg-[#e6edff]',
        accent: 'bg-blue-600',
        content: (
            <div className='relative flex h-full items-center justify-center overflow-hidden p-8 sm:p-12'>
                <div className='absolute -right-16 -top-16 size-64 rounded-full border border-blue-900/10' aria-hidden='true' />
                <div className='relative w-full max-w-sm rounded-2xl bg-slate-950 p-6 text-white shadow-[0_25px_70px_rgba(15,23,42,.25)]'>
                    <div className='flex items-center gap-4'><span className='flex size-11 items-center justify-center rounded-xl bg-blue-500'><Headphones size={21} /></span><div><p className='text-sm font-semibold'>Technical support</p><p className='mt-0.5 text-xs text-slate-400'>B.I.T.S Pakistan</p></div><span className='ml-auto size-2 rounded-full bg-green-400 shadow-[0_0_0_5px_rgba(74,222,128,.12)]' /></div>
                    <div className='mt-8 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300'>How can we help with your drive?</div>
                    <div className='ml-auto mt-3 max-w-[80%] rounded-xl bg-blue-600 px-4 py-3 text-sm'>I need help with compatibility.</div>
                    <p className='mt-7 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500'>Available around the clock</p>
                </div>
            </div>
        ),
    },
]

export default function OurSpecs() {
    return (
        <section className='mx-auto my-24 max-w-6xl px-4 sm:my-36 sm:px-6' data-spec-stack>
            <div className='mb-14 sm:mb-20'>
                <Title visibleButton={false} title='Our Specifications' description='The service standards behind every B.I.T.S Pakistan drive—from inspection to after-sales support.' />
            </div>

            <div className='relative'>
                {ourSpecsData.map((spec, index) => {
                    const theme = visualThemes[index]
                    return (
                        <article
                            className='sticky mb-[16vh] grid min-h-[560px] origin-top overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,.10)] last:mb-0 lg:min-h-[500px] lg:grid-cols-2'
                            style={{ top: `${72 + index * 14}px`, zIndex: index + 1 }}
                            key={spec.title}
                            data-spec-card
                        >
                            <div className='flex flex-col justify-between p-7 sm:p-10 lg:p-12' data-spec-copy>
                                <div>
                                    <div className='flex items-center justify-between'>
                                        <span className='font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400'>Standard / 0{index + 1}</span>
                                        <span className={`size-2 rounded-full ${theme.accent}`} aria-hidden='true' />
                                    </div>
                                    <div className={`mt-10 flex size-12 items-center justify-center rounded-xl text-white ${theme.accent}`}>
                                        <spec.icon size={22} />
                                    </div>
                                    <h3 className='mt-7 max-w-sm text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl'>{spec.title}</h3>
                                    <p className='mt-5 max-w-md text-base leading-7 text-slate-600'>{spec.description}</p>
                                </div>
                                <Link href={index === 0 ? '/warranty-policy' : 'https://wa.me/923349922317'} target={index === 0 ? undefined : '_blank'} rel={index === 0 ? undefined : 'noopener noreferrer'} className='group mt-10 inline-flex min-h-11 w-fit items-center gap-3 text-sm font-semibold text-slate-900 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-green-600'>
                                    {index === 0 ? 'Read warranty policy' : 'Contact WhatsApp'}
                                    <span className={`flex size-9 items-center justify-center rounded-lg text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${theme.accent}`}><ArrowUpRight size={16} /></span>
                                </Link>
                            </div>

                            <div className={`min-h-[300px] lg:min-h-full ${theme.panel}`} data-spec-visual>
                                {theme.content}
                            </div>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}
