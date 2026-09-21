'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Title = ({ title, description, visibleButton = true, href = '' }) => {

    return (
        <div className='flex flex-col items-center text-center' data-section-heading>
            <h2 className='text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl'>{title}</h2>
            <p className='mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base'>{description}</p>
            {visibleButton && (
                <Link href={href} className='mt-4 inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-semibold text-green-700 transition hover:bg-green-50 hover:text-green-800 focus-visible:outline-2 focus-visible:outline-green-600'>
                    View all <ArrowRight size={15} />
                </Link>
            )}
        </div>
    )
}

export default Title
