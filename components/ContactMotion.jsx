'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ContactMotion({ children }) {
    const root = useRef(null)

    useLayoutEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

        const context = gsap.context(() => {
            const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

            timeline
                .from('[data-contact-eyebrow]', { autoAlpha: 0, y: 14, duration: 0.5 })
                .from('[data-contact-line]', { autoAlpha: 0, yPercent: 110, duration: 0.75, stagger: 0.09 }, '-=0.2')
                .from('[data-contact-copy]', { autoAlpha: 0, y: 20, duration: 0.65, stagger: 0.08 }, '-=0.35')
                .from('[data-contact-card]', { autoAlpha: 0, x: 36, rotate: 1.5, duration: 0.8 }, '-=0.6')
                .from('[data-contact-detail]', { autoAlpha: 0, y: 18, duration: 0.5, stagger: 0.08 }, '-=0.35')

            gsap.to('[data-contact-orbit]', {
                rotate: 18,
                duration: 12,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                transformOrigin: 'center',
            })
        }, root)

        return () => context.revert()
    }, [])

    return <div ref={root}>{children}</div>
}
