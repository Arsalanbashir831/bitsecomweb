import { assets } from '@/assets/assets'
import { ArrowRightIcon, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import CategoriesMarquee from './CategoriesMarquee'
import Link from 'next/link'

const Hero = () => {
    return (
        <div className='mx-4 sm:mx-6'>
            <section className='relative mx-auto mt-6 max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 text-white sm:mt-10' data-home-hero>
                <div className='absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(148,163,184,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.08)_1px,transparent_1px)] [background-size:48px_48px]' aria-hidden='true' />
                <div className='absolute left-[55%] top-[-30%] size-[34rem] rounded-full bg-green-400/10 blur-3xl' aria-hidden='true' />

                <div className='relative grid min-h-[620px] lg:grid-cols-[1.05fr_.95fr]'>
                    <div className='z-10 flex flex-col justify-center px-6 py-14 sm:px-12 sm:py-20 lg:px-16'>
                        <p className='font-mono text-xs uppercase tracking-[0.22em] text-green-400' data-hero-eyebrow>
                            Storage infrastructure / Pakistan
                        </p>
                        <h1 className='mt-6 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl xl:text-7xl'>
                            <span className='block overflow-hidden'><span className='block' data-hero-line>Best HDD Wholesale Dealer</span></span>
                            <span className='block overflow-hidden'><span className='block text-slate-400' data-hero-line>in Pakistan</span></span>
                        </h1>
                        <p className='mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg' data-hero-copy>
                            Dependable HDDs and SSDs for CCTV, DVR, NVR, desktop, and laptop systems—with verified health and up to 1-2 years replacement warranty.
                        </p>
                        <div className='mt-9 flex flex-wrap items-center gap-4'>
                            <Link href='/shop' className='group inline-flex min-h-12 items-center gap-3 rounded-md bg-green-400 px-6 text-sm font-semibold text-slate-950 transition hover:bg-green-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-400' data-hero-action>
                                Explore drives <ArrowRightIcon className='transition-transform group-hover:translate-x-1' size={17} />
                            </Link>
                            <Link href='/warranty-policy' className='inline-flex min-h-12 items-center rounded-md border border-slate-700 px-6 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-400' data-hero-action>
                                Warranty policy
                            </Link>
                        </div>
                        <div className='mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-slate-800 pt-6 text-xs text-slate-400' data-hero-copy>
                            <span className='flex items-center gap-2'><CheckCircle2 className='text-green-400' size={15} /> Health checked</span>
                            <span className='flex items-center gap-2'><CheckCircle2 className='text-green-400' size={15} /> Supply All Over Pakistan</span>
                            <span className='flex items-center gap-2'><CheckCircle2 className='text-green-400' size={15} /> Wholesale available</span>
                        </div>
                    </div>

                    <div className='relative flex min-h-[420px] items-end justify-center overflow-hidden lg:min-h-0'>
                        <div className='absolute inset-x-10 bottom-8 h-36 rounded-[50%] bg-green-400/15 blur-3xl' aria-hidden='true' />
                        <Image
                            className='relative z-[1] w-[92%] max-w-[650px] translate-y-[3%] object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,.45)]'
                            src={assets.hero_model_img}
                            alt='Surveillance hard drives and CCTV camera equipment'
                            priority
                            data-hero-visual
                        />
                        {/* <div className='absolute right-5 top-5 z-[2] border-l border-green-400/60 bg-slate-950/80 px-4 py-3 backdrop-blur-sm sm:right-8 sm:top-8' data-hero-stat>
                            <p className='font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500'>Coverage</p>
                            <p className='mt-1 text-sm font-medium'>Up to 2 years</p>
                        </div> */}

                    </div>
                </div>
            </section>
            <CategoriesMarquee />
        </div>
    )
}

export default Hero
