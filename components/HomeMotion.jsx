'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export default function HomeMotion({ children }) {
    const root = useRef(null)

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduceMotion) return undefined

        const context = gsap.context(() => {
            const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })

            intro
                .from('[data-hero-eyebrow]', { autoAlpha: 0, y: 14, duration: 0.55 })
                .from('[data-hero-line]', { autoAlpha: 0, yPercent: 110, duration: 0.8, stagger: 0.1 }, '-=0.25')
                .from('[data-hero-copy]', { autoAlpha: 0, y: 18, duration: 0.65 }, '-=0.4')
                .from('[data-hero-action]', { autoAlpha: 0, y: 14, duration: 0.55, stagger: 0.08 }, '-=0.35')
                .from('[data-hero-visual]', { autoAlpha: 0, scale: 0.92, rotate: 2, duration: 1.05, ease: 'power2.out' }, '-=0.8')
                .from('[data-hero-stat]', { autoAlpha: 0, y: 12, duration: 0.5, stagger: 0.08 }, '-=0.55')

            gsap.to('[data-hero-visual]', {
                yPercent: 8,
                ease: 'none',
                scrollTrigger: {
                    trigger: '[data-home-hero]',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.8,
                },
            })

            gsap.utils.toArray('[data-reveal-section]').forEach((section) => {
                const heading = section.querySelector('[data-section-heading]')
                const items = section.querySelectorAll('[data-reveal-item]')

                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 78%',
                        once: true,
                    },
                })

                if (heading) {
                    timeline.from(heading, { autoAlpha: 0, y: 28, duration: 0.7, ease: 'power3.out' })
                }

                if (items.length) {
                    timeline.from(items, { autoAlpha: 0, y: 34, duration: 0.65, stagger: 0.1, ease: 'power3.out' }, heading ? '-=0.35' : 0)
                }
            })

            const specCards = gsap.utils.toArray('[data-spec-card]')

            specCards.forEach((card, index) => {
                gsap.from([
                    card.querySelector('[data-spec-copy]'),
                    card.querySelector('[data-spec-visual]'),
                ], {
                    autoAlpha: 0,
                    y: 42,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 78%',
                        once: true,
                    },
                })

                const nextCard = specCards[index + 1]
                if (nextCard) {
                    gsap.to(card, {
                        scale: 0.96 - index * 0.01,
                        boxShadow: '0 18px 46px rgba(15, 23, 42, 0.08)',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: nextCard,
                            start: 'top 82%',
                            end: 'top 16%',
                            scrub: 0.7,
                        },
                    })
                }
            })
        }, root)

        return () => context.revert()
    }, [])

    return <div ref={root}>{children}</div>
}
