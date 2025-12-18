import Link from 'next/link'
import Image from 'next/image'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { LinkIcon, RocketIcon } from '@/components/icons'
import { storeLinks } from '@/lib/info'
import logoDiy from '@/images/projects/diy.png'
import logoParra from '@/images/projects/parra.png'
import logoMaxPageSize from '@/images/projects/max-page-size.png'
import logoMojo from '@/images/projects/mojo.png'
import downloadAppStore from '@/images/download-app-store.svg'
import chromeIcon from '@/images/chrome.png'
import safariIcon from '@/images/safari.png'

function ProjectLogo({ src }: { src: typeof logoDiy }) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white p-1 shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5">
      <Image
        src={src}
        alt=""
        className="h-full w-full rounded-md object-cover"
        unoptimized
      />
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
      className="group inline-flex items-center gap-2 rounded-full bg-white py-1.5 pr-4 pl-1.5 text-sm font-medium text-zinc-800 shadow-sm ring-1 ring-zinc-200 transition hover:bg-zinc-50 hover:ring-zinc-300"
    >
      <Image src={icon} alt="" className="h-6 w-6" unoptimized />
      <span>{children}</span>
    </Link>
  )
}

export function Projects() {
  return (
    <Container className="mt-16 md:mt-20">
      <h2 className="flex text-sm font-semibold text-zinc-900">
        <RocketIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Recent Projects</span>
      </h2>
      <ul
        role="list"
        className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:max-w-5xl"
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
              <div className="absolute -inset-4 z-0 scale-95 rounded-2xl bg-zinc-50 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 sm:-inset-6" />
              <div className="relative z-10 flex items-center gap-3">
                <ProjectLogo src={logoDiy} />
                <h3 className="text-base font-semibold text-zinc-800">
                  DIYProject.ai
                </h3>
              </div>
              <p className="relative z-10 mt-2 text-sm text-zinc-600">
                AI-powered DIY project planner and home maintenance tracker.
              </p>
              <div className="relative z-10 mt-4">
                <p className="inline-flex items-center gap-1.5 text-sm font-medium leading-none text-zinc-500 transition group-hover:text-teal-500">
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
              <div className="absolute -inset-4 z-0 scale-95 rounded-2xl bg-zinc-50 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 sm:-inset-6" />
              <div className="relative z-10 flex items-center gap-3">
                <ProjectLogo src={logoParra} />
                <h3 className="text-base font-semibold text-zinc-800">
                  Parra
                </h3>
              </div>
              <p className="relative z-10 mt-2 text-sm text-zinc-600">
                Everything you need to build apps.
              </p>
              <div className="relative z-10 mt-4">
                <p className="inline-flex items-center gap-1.5 text-sm font-medium leading-none text-zinc-500 transition group-hover:text-teal-500">
                  <LinkIcon className="h-4 w-4 shrink-0" />
                  <span>parra.io</span>
                </p>
              </div>
            </Link>
          </li>
        </FadeIn>

        {/* Max Page Size - Hidden for now
        <FadeIn delay={200}>
          <li className="group relative flex flex-col items-start">
            <div className="relative z-10 flex items-center gap-3">
              <ProjectLogo src={logoMaxPageSize} />
              <h3 className="text-base font-semibold text-zinc-800">
                Max Page Size
              </h3>
            </div>
            <p className="relative z-10 mt-2 text-sm text-zinc-600">
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
        */}

        {/* Mojo Score Keeper */}
        <FadeIn delay={300}>
          <li className="group relative flex flex-col items-start">
            <div className="relative z-10 flex items-center gap-3">
              <ProjectLogo src={logoMojo} />
              <h3 className="text-base font-semibold text-zinc-800">
                Mojo Score Keeper
              </h3>
            </div>
            <p className="relative z-10 mt-2 text-sm text-zinc-600">
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
