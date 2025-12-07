'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

import { Container } from '@/components/Container'
import avatarImage from '@/images/avatar.png'

function SunIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
      <path
        d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
        fill="none"
      />
    </svg>
  )
}

function MoonIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ThemeToggle() {
  let { resolvedTheme, setTheme } = useTheme()
  let otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
  let [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'}
      className="group rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={() => setTheme(otherTheme)}
    >
      <SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600" />
      <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition not-[@media_(prefers-color-scheme:dark)]:fill-teal-400/10 not-[@media_(prefers-color-scheme:dark)]:stroke-teal-500 dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400" />
    </button>
  )
}

function Avatar({ scale = 1 }: { scale?: number }) {
  const size = 96 * scale
  return (
    <Link href="/" aria-label="Home" className="pointer-events-auto">
      <Image
        src={avatarImage}
        alt=""
        sizes="6rem"
        className="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
        style={{ width: size, height: size }}
        priority
      />
    </Link>
  )
}

function SmallAvatar() {
  return (
    <Link href="/" aria-label="Home" className="pointer-events-auto">
      <div className="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10">
        <Image
          src={avatarImage}
          alt=""
          sizes="2.25rem"
          className="h-9 w-9 rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
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
      <div className="pt-6">
        <Container>
          <div className="flex justify-end">
            <div className="pointer-events-auto">
              <ThemeToggle />
            </div>
          </div>
        </Container>
      </div>
      {isHomePage && (
        <Container className="mt-6">
          <div
            ref={avatarRef}
            className="flex justify-center sm:justify-start"
            style={{ height: 96 }}
          >
            <div style={{ transform: `scale(${avatarScale})`, transformOrigin: 'top center' }} className="sm:origin-top-left">
              <Avatar />
            </div>
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
