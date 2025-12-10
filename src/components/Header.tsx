'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

import { Container } from '@/components/Container'
import avatarImage from '@/images/avatar.png'

function Avatar({ scale = 1 }: { scale?: number }) {
  const size = 96 * scale
  return (
    <div
      className="flex items-center justify-center rounded-full bg-white p-1.5 shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5"
      style={{ width: size, height: size }}
    >
      <Image
        src={avatarImage}
        alt=""
        sizes="6rem"
        className="h-full w-full rounded-full object-cover"
        priority
      />
    </div>
  )
}

function SmallAvatar() {
  return (
    <Link href="/" aria-label="Home" className="pointer-events-auto">
      <div className="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm">
        <Image
          src={avatarImage}
          alt=""
          sizes="2.25rem"
          className="h-9 w-9 rounded-full bg-zinc-100 object-cover"
          priority
        />
      </div>
    </Link>
  )
}

export function Header() {
  const isHomePage = usePathname() === '/'
  const [avatarScale, setAvatarScale] = useState(1)
  const avatarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isHomePage) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = 100
      const minScale = 36 / 96
      const scale = Math.max(minScale, 1 - (scrollY / maxScroll) * (1 - minScale))
      setAvatarScale(scale)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  return (
    <header className="pointer-events-none relative z-50 flex flex-none flex-col">
      {isHomePage && (
        <Container className="mt-6">
          <div
            ref={avatarRef}
            className="flex justify-center sm:justify-start"
            style={{ height: 96 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              style={{ transform: `scale(${avatarScale})`, transformOrigin: 'top center' }}
              className="sm:origin-top-left"
            >
              <Avatar />
            </motion.div>
          </div>
        </Container>
      )}
      {!isHomePage && (
        <Container className="mt-6">
          <SmallAvatar />
        </Container>
      )}
    </header>
  )
}
