import Link from 'next/link'
import Image from 'next/image'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { storeLinks } from '@/lib/info'
import logoDiy from '@/images/projects/diy.png'
import logoDiyDark from '@/images/projects/diy-dark.png'
import logoParra from '@/images/projects/parra.png'
import logoMaxPageSize from '@/images/projects/max-page-size.png'
import logoMojo from '@/images/projects/mojo.png'
import downloadAppStore from '@/images/download-app-store.svg'
import chromeIcon from '@/images/chrome.png'
import safariIcon from '@/images/safari.png'

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ProjectLogo({
  src,
  srcDark,
}: {
  src: typeof logoDiy
  srcDark?: typeof logoDiy
}) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white p-1 shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
      <Image
        src={src}
        alt=""
        className={`h-full w-full rounded-md object-cover ${srcDark ? 'opacity-100 dark:opacity-0' : ''}`}
        unoptimized
      />
      {srcDark && (
        <Image
          src={srcDark}
          alt=""
          className="absolute inset-1 h-[calc(100%-8px)] w-[calc(100%-8px)] rounded-md object-cover opacity-0 dark:opacity-100"
          unoptimized
        />
      )}
    </div>
  )
}

function StoreButton({
  href,
  icon,
  children,
}: {
  href: string
  icon: typeof chromeIcon
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 rounded-full bg-white py-1.5 pr-4 pl-1.5 text-sm font-medium text-zinc-800 shadow-sm ring-1 ring-zinc-200 transition hover:bg-zinc-50 hover:ring-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-700 dark:hover:ring-zinc-600"
    >
      <Image src={icon} alt="" className="h-6 w-6" unoptimized />
      <span>{children}</span>
    </Link>
  )
}

export function Projects() {
  return (
    <Container className="mt-16 md:mt-20">
      <ul
        role="list"
        className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:max-w-5xl"
      >
        {/* DIYProject.ai */}
        <FadeIn>
          <li className="group relative flex flex-col items-start cursor-pointer">
            <Link
              href="https://diyproject.ai"
              className="contents"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="absolute -inset-4 z-0 scale-95 rounded-2xl bg-zinc-50 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 sm:-inset-6 dark:bg-zinc-800/50" />
              <div className="relative z-10 flex items-center gap-3">
                <ProjectLogo src={logoDiy} srcDark={logoDiyDark} />
                <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  DIYProject.ai
                </h3>
              </div>
              <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                AI-powered DIY project planner and home maintenance tracker.
              </p>
              <div className="relative z-10 mt-4">
                <p className="inline-flex items-center gap-1.5 text-sm font-medium leading-none text-zinc-500 transition group-hover:text-teal-500 dark:text-zinc-400 dark:group-hover:text-teal-400">
                  <LinkIcon className="h-4 w-4 shrink-0" />
                  <span>diyproject.ai</span>
                </p>
              </div>
            </Link>
          </li>
        </FadeIn>

        {/* Parra */}
        <FadeIn delay={100}>
          <li className="group relative flex flex-col items-start cursor-pointer">
            <Link
              href="https://parra.io"
              className="contents"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="absolute -inset-4 z-0 scale-95 rounded-2xl bg-zinc-50 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 sm:-inset-6 dark:bg-zinc-800/50" />
              <div className="relative z-10 flex items-center gap-3">
                <ProjectLogo src={logoParra} />
                <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  Parra
                </h3>
              </div>
              <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Everything you need to build apps.
              </p>
              <div className="relative z-10 mt-4">
                <p className="inline-flex items-center gap-1.5 text-sm font-medium leading-none text-zinc-500 transition group-hover:text-teal-500 dark:text-zinc-400 dark:group-hover:text-teal-400">
                  <LinkIcon className="h-4 w-4 shrink-0" />
                  <span>parra.io</span>
                </p>
              </div>
            </Link>
          </li>
        </FadeIn>

        {/* Max Page Size */}
        <FadeIn delay={200}>
          <li className="group relative flex flex-col items-start">
            <div className="relative z-10 flex items-center gap-3">
              <ProjectLogo src={logoMaxPageSize} />
              <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                Max Page Size
              </h3>
            </div>
            <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Browser extension that auto-selects max page size on paginated
              sites.
            </p>
            <div className="relative z-10 mt-4 flex flex-wrap gap-3">
              <StoreButton href={storeLinks.maxPageSize.chrome} icon={chromeIcon}>
                Chrome
              </StoreButton>
              <StoreButton href={storeLinks.maxPageSize.safari} icon={safariIcon}>
                Safari
              </StoreButton>
            </div>
          </li>
        </FadeIn>

        {/* Mojo Score Keeper */}
        <FadeIn delay={300}>
          <li className="group relative flex flex-col items-start">
            <div className="relative z-10 flex items-center gap-3">
              <ProjectLogo src={logoMojo} />
              <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                Mojo Score Keeper
              </h3>
            </div>
            <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Clean, intuitive score keeper for the card game Mojo.
            </p>
            <div className="relative z-10 mt-4">
              <Link
                href="https://apps.apple.com/us/app/mojo-score-keeper/id6749283633"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:opacity-80"
              >
                <Image
                  src={downloadAppStore}
                  alt="Download on the App Store"
                  className="h-9 w-auto"
                  unoptimized
                />
              </Link>
            </div>
          </li>
        </FadeIn>
      </ul>
    </Container>
  )
}
