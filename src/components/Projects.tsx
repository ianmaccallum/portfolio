import Link from 'next/link'
import Image from 'next/image'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { RocketIcon } from '@/components/icons'
import { ExternalLink } from 'lucide-react'
import { storeLinks } from '@/lib/info'
import logoDiy from '@/images/projects/diy.png'
import logoParra from '@/images/projects/parra.png'
import logoMaxPageSize from '@/images/projects/max-page-size.png'
import logoMojo from '@/images/projects/mojo.png'
import downloadAppStore from '@/images/download-app-store.svg'
import chromeIcon from '@/images/chrome.png'
import safariIcon from '@/images/safari.png'
import logoOnlyRecipes from '@/images/projects/only-recipes.png'
import logoCatIQ from '@/images/projects/cat-iq-test.png'
import logoDogIQ from '@/images/projects/dog-iq-test.png'
import logoNoContext from '@/images/projects/no-context.svg'
import logoThoughtful from '@/images/projects/thoughtful.png'
import logoEncore from '@/images/projects/encore.svg'
import logoClaudeDrops from '@/images/projects/claude-drops.png'
import logoTaxDays from '@/images/projects/tax-days.png'
import logoStartupIdeas from '@/images/projects/startup-ideas.png'
import logoGirlMath from '@/images/projects/girl-math.png'

function ProjectLogo({ src, bordered }: { src: typeof logoDiy; bordered?: boolean }) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white p-1 shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5">
      <Image
        src={src}
        alt=""
        className={`h-full w-full rounded-md object-cover ${bordered ? 'ring-1 ring-zinc-200' : ''}`}
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
        {/* Thoughtful */}
        <FadeIn>
          <li className="group relative flex flex-col items-start cursor-pointer">
            <Link
              href="https://thoughtful.app"
              className="contents"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="absolute -inset-4 z-0 scale-95 rounded-2xl bg-zinc-50 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 sm:-inset-6" />
              <div className="relative z-10 flex items-center gap-3">
                <ProjectLogo src={logoThoughtful} bordered />
                <h3 className="text-base font-semibold text-zinc-800">
                  Thoughtful
                </h3>
                <p className="inline-flex items-center gap-0.5 text-sm font-medium leading-none text-zinc-500 transition group-hover:text-teal-500">
                  <span>thoughtful.app</span>
                  <ExternalLink className="ml-0.5 h-3 w-3 shrink-0" />
                </p>
              </div>
              <p className="relative z-10 mt-2 text-sm text-zinc-600">
                AI-powered greeting cards for the people you care about.
              </p>
            </Link>
            <div className="relative z-10 mt-4">
              <Link
                href="https://apps.apple.com/app/id6762098726"
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

        {/* Encore */}
        <FadeIn delay={50}>
          <li className="group relative flex flex-col items-start cursor-pointer">
            <Link
              href="https://encorelivemusic.app"
              className="contents"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="absolute -inset-4 z-0 scale-95 rounded-2xl bg-zinc-50 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 sm:-inset-6" />
              <div className="relative z-10 flex items-center gap-3">
                <ProjectLogo src={logoEncore} />
                <h3 className="text-base font-semibold text-zinc-800">
                  Encore
                </h3>
                <p className="inline-flex items-center gap-0.5 text-sm font-medium leading-none text-zinc-500 transition group-hover:text-teal-500">
                  <span>encorelivemusic.app</span>
                  <ExternalLink className="ml-0.5 h-3 w-3 shrink-0" />
                </p>
              </div>
              <p className="relative z-10 mt-2 text-sm text-zinc-600">
                A printable link-in-bio for live musicians — tips, song requests, and feedback in one QR.
              </p>
            </Link>
          </li>
        </FadeIn>

        {/* Claude Drops */}
        <FadeIn delay={100}>
          <li className="group relative flex flex-col items-start">
            <div className="relative z-10 flex items-center gap-3">
              <ProjectLogo src={logoClaudeDrops} />
              <h3 className="text-base font-semibold text-zinc-800">
                Claude Drops
              </h3>
            </div>
            <p className="relative z-10 mt-2 text-sm text-zinc-600">
              Never miss a Claude Code release — changelog, notifications, and widgets.
            </p>
            <div className="relative z-10 mt-4">
              <Link
                href="https://apps.apple.com/app/id6760681118"
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

        {/* Tax Days */}
        <FadeIn delay={150}>
          <li className="group relative flex flex-col items-start">
            <div className="relative z-10 flex items-center gap-3">
              <ProjectLogo src={logoTaxDays} />
              <h3 className="text-base font-semibold text-zinc-800">
                Tax Days
              </h3>
            </div>
            <p className="relative z-10 mt-2 text-sm text-zinc-600">
              Tax residency tracker — US federal, state, Schengen 90/180, and the UK SRT in one app.
            </p>
            <div className="relative z-10 mt-4">
              <Link
                href="https://apps.apple.com/app/id6761441335"
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

        {/* Startup Ideas */}
        <FadeIn delay={200}>
          <li className="group relative flex flex-col items-start">
            <div className="relative z-10 flex items-center gap-3">
              <ProjectLogo src={logoStartupIdeas} />
              <h3 className="text-base font-semibold text-zinc-800">
                Ideas
              </h3>
            </div>
            <p className="relative z-10 mt-2 text-sm text-zinc-600">
              A simple, beautiful place to capture every startup idea before it slips away.
            </p>
            <div className="relative z-10 mt-4">
              <Link
                href="https://apps.apple.com/app/id6761696994"
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

        {/* Girl Math */}
        <FadeIn delay={250}>
          <li className="group relative flex flex-col items-start">
            <div className="relative z-10 flex items-center gap-3">
              <ProjectLogo src={logoGirlMath} />
              <h3 className="text-base font-semibold text-zinc-800">
                Girl Math
              </h3>
            </div>
            <p className="relative z-10 mt-2 text-sm text-zinc-600">
              Track returns and unused purchases — never lose money to a forgotten receipt again.
            </p>
            <div className="relative z-10 mt-4">
              <Link
                href="https://apps.apple.com/app/id6761315341"
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

        {/* Only Recipes */}
        <FadeIn delay={300}>
          <li className="group relative flex flex-col items-start cursor-pointer">
            <Link
              href="https://onlyrecipes.app"
              className="contents"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="absolute -inset-4 z-0 scale-95 rounded-2xl bg-zinc-50 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 sm:-inset-6" />
              <div className="relative z-10 flex items-center gap-3">
                <ProjectLogo src={logoOnlyRecipes} bordered />
                <h3 className="text-base font-semibold text-zinc-800">
                  Only Recipes
                </h3>
                <p className="inline-flex items-center gap-0.5 text-sm font-medium leading-none text-zinc-500 transition group-hover:text-teal-500">
                  <span>onlyrecipes.app</span>
                  <ExternalLink className="ml-0.5 h-3 w-3 shrink-0" />
                </p>
              </div>
              <p className="relative z-10 mt-2 text-sm text-zinc-600">
                Instantly extract just the recipe — from any website, with one click.
              </p>
            </Link>
            <div className="relative z-10 mt-4">
              <Link
                href="https://apps.apple.com/us/app/only-recipes/id1553858589"
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

        {/* No Context Bot */}
        <FadeIn delay={350}>
          <li className="group relative flex flex-col items-start cursor-pointer">
            <Link
              href="https://nocontextbot.com"
              className="contents"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="absolute -inset-4 z-0 scale-95 rounded-2xl bg-zinc-50 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 sm:-inset-6" />
              <div className="relative z-10 flex items-center gap-3">
                <ProjectLogo src={logoNoContext} />
                <h3 className="text-base font-semibold text-zinc-800">
                  No Context Bot
                </h3>
                <p className="inline-flex items-center gap-0.5 text-sm font-medium leading-none text-zinc-500 transition group-hover:text-teal-500">
                  <span>nocontextbot.com</span>
                  <ExternalLink className="ml-0.5 h-3 w-3 shrink-0" />
                </p>
              </div>
              <p className="relative z-10 mt-2 text-sm text-zinc-600">
                A Slack bot that turns out-of-context quotes into AI-generated artwork.
              </p>
            </Link>
          </li>
        </FadeIn>

        {/* Mojo Score Keeper */}
        <FadeIn delay={400}>
          <li className="group relative flex flex-col items-start">
            <div className="relative z-10 flex items-center gap-3">
              <ProjectLogo src={logoMojo} />
              <div className="flex flex-col">
                <h3 className="text-base font-semibold text-zinc-800">
                  Mojo Score Keeper
                </h3>
              </div>
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

        {/* DIYProject.ai */}
        <FadeIn delay={450}>
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
                <p className="inline-flex items-center gap-0.5 text-sm font-medium leading-none text-zinc-500 transition group-hover:text-teal-500">
                  <span>diyproject.ai</span>
                  <ExternalLink className="ml-0.5 h-3 w-3 shrink-0" />
                </p>
              </div>
              <p className="relative z-10 mt-2 text-sm text-zinc-600">
                AI-powered DIY project planner and home maintenance tracker.
              </p>
            </Link>
          </li>
        </FadeIn>

        {/* Cat IQ Test */}
        <FadeIn delay={500}>
          <li className="group relative flex flex-col items-start">
            <div className="relative z-10 flex items-center gap-3">
              <ProjectLogo src={logoCatIQ} />
              <div className="flex flex-col">
                <h3 className="text-base font-semibold text-zinc-800">
                  Cat IQ Test
                </h3>
              </div>
            </div>
            <p className="relative z-10 mt-2 text-sm text-zinc-600">
              Silly app to quiz your cat's intelligence and generate an
              official IQ certificate.
            </p>
            <div className="relative z-10 mt-4">
              <Link
                href="https://apps.apple.com/app/id6759520249"
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

        {/* Dog IQ Test */}
        <FadeIn delay={550}>
          <li className="group relative flex flex-col items-start">
            <div className="relative z-10 flex items-center gap-3">
              <ProjectLogo src={logoDogIQ} />
              <div className="flex flex-col">
                <h3 className="text-base font-semibold text-zinc-800">
                  Dog IQ Test
                </h3>
              </div>
            </div>
            <p className="relative z-10 mt-2 text-sm text-zinc-600">
              Silly app to quiz your dog's intelligence and generate an
              official IQ certificate.
            </p>
            <div className="relative z-10 mt-4">
              <Link
                href="https://apps.apple.com/app/id6759539103"
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

        {/* Parra */}
        <FadeIn delay={600}>
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
                <p className="inline-flex items-center gap-0.5 text-sm font-medium leading-none text-zinc-500 transition group-hover:text-teal-500">
                  <span>parra.io</span>
                  <ExternalLink className="ml-0.5 h-3 w-3 shrink-0" />
                </p>
              </div>
              <p className="relative z-10 mt-2 text-sm text-zinc-600">
                Everything you need to build apps.
              </p>
            </Link>
          </li>
        </FadeIn>

        {/* Max Page Size - Hidden for now
        <FadeIn delay={400}>
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
      </ul>
    </Container>
  )
}
