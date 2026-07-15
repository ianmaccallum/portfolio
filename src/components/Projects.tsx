'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image, { type StaticImageData } from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ExternalLink } from 'lucide-react'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { RocketIcon } from '@/components/icons'
import downloadAppStore from '@/images/download-app-store.svg'
import logoDiy from '@/images/projects/diy.png'
import logoParra from '@/images/projects/parra.png'
import logoMojo from '@/images/projects/mojo.png'
import logoOnlyRecipes from '@/images/projects/only-recipes.png'
import logoCatIQ from '@/images/projects/cat-iq-test.png'
import logoDogIQ from '@/images/projects/dog-iq-test.png'
import logoNoContext from '@/images/projects/no-context.svg'
import logoThoughtful from '@/images/projects/thoughtful.png'
import logoEncore from '@/images/projects/encore.png'
import logoClaudeDrops from '@/images/projects/claude-drops.png'
import logoTaxDays from '@/images/projects/tax-days.png'
import logoStartupIdeas from '@/images/projects/startup-ideas.png'
import logoGirlMath from '@/images/projects/girl-math.png'
import logoSkipper from '@/images/projects/skipper.png'

type Project = {
  name: string
  logo: StaticImageData
  description: string
  bordered?: boolean
  website?: string
  websiteUrl?: string
  appStoreUrl?: string
}

const featuredProjects: Project[] = [
  {
    name: 'Tax Days',
    logo: logoTaxDays,
    website: 'taxdaysresidencytracker.com',
    websiteUrl: 'https://taxdaysresidencytracker.com',
    description:
      'Tax residency tracker — US federal, state, Schengen 90/180, and the UK SRT in one app.',
    appStoreUrl: 'https://apps.apple.com/app/id6761441335',
  },
  {
    name: 'DIYProject.ai',
    logo: logoDiy,
    website: 'diyproject.ai',
    websiteUrl: 'https://diyproject.ai',
    description: 'AI-powered DIY project planner and home maintenance tracker.',
  },
  {
    name: 'Only Recipes',
    logo: logoOnlyRecipes,
    bordered: true,
    website: 'onlyrecipes.app',
    websiteUrl: 'https://onlyrecipes.app',
    description: 'Instantly extract just the recipe — from any website, with one click.',
    appStoreUrl: 'https://apps.apple.com/us/app/only-recipes/id1553858589',
  },
  {
    name: 'Thoughtful',
    logo: logoThoughtful,
    bordered: true,
    website: 'thoughtful.app',
    websiteUrl: 'https://thoughtful.app',
    description: 'AI-powered greeting cards for the people you care about.',
    appStoreUrl: 'https://apps.apple.com/app/id6762098726',
  },
  {
    name: 'Skipper',
    logo: logoSkipper,
    description: 'Boat maintenance log with engine hours and resale-ready PDF reports.',
    appStoreUrl: 'https://apps.apple.com/us/app/skipper-boat-maintenance-log/id6770317576',
  },
  {
    name: 'Encore',
    logo: logoEncore,
    website: 'encorelivemusic.app',
    websiteUrl: 'https://encorelivemusic.app',
    description:
      'A printable link-in-bio for live musicians — tips, song requests, and feedback in one QR.',
  },
  {
    name: 'Claude Drops',
    logo: logoClaudeDrops,
    description: 'Never miss a Claude Code release — changelog, notifications, and widgets.',
    appStoreUrl: 'https://apps.apple.com/app/id6760681118',
  },
  {
    name: 'No Context Bot',
    logo: logoNoContext,
    website: 'nocontextbot.com',
    websiteUrl: 'https://nocontextbot.com',
    description: 'A Slack bot that turns out-of-context quotes into AI-generated artwork.',
  },
]

const moreProjects: Project[] = [
  {
    name: 'Girl Math',
    logo: logoGirlMath,
    description:
      'Track returns and unused purchases — never lose money to a forgotten receipt again.',
    appStoreUrl: 'https://apps.apple.com/app/id6761315341',
  },
  {
    name: 'Ideas',
    logo: logoStartupIdeas,
    description: 'A simple, beautiful place to capture every startup idea before it slips away.',
    appStoreUrl: 'https://apps.apple.com/app/id6761696994',
  },
  {
    name: 'Mojo Score Keeper',
    logo: logoMojo,
    description: 'Clean, intuitive score keeper for the card game Mojo.',
    appStoreUrl: 'https://apps.apple.com/us/app/mojo-score-keeper/id6749283633',
  },
  {
    name: 'Cat IQ Test',
    logo: logoCatIQ,
    description:
      "Silly app to quiz your cat's intelligence and generate an official IQ certificate.",
    appStoreUrl: 'https://apps.apple.com/app/id6759520249',
  },
  {
    name: 'Dog IQ Test',
    logo: logoDogIQ,
    description:
      "Silly app to quiz your dog's intelligence and generate an official IQ certificate.",
    appStoreUrl: 'https://apps.apple.com/app/id6759539103',
  },
  {
    name: 'Parra',
    logo: logoParra,
    website: 'parra.io',
    websiteUrl: 'https://parra.io',
    description: 'Everything you need to build apps.',
  },
]

const gridClasses =
  'mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:max-w-5xl'

function ProjectLogo({ src, bordered }: { src: StaticImageData; bordered?: boolean }) {
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

function ProjectCard({ project }: { project: Project }) {
  const { name, logo, bordered, description, website, websiteUrl, appStoreUrl } = project

  const header = (
    <>
      <div className="relative z-10 flex items-center gap-3">
        <ProjectLogo src={logo} bordered={bordered} />
        <h3 className="text-base font-semibold text-zinc-800">{name}</h3>
        {website && (
          <p className="inline-flex items-center gap-0.5 text-sm font-medium leading-none text-zinc-500 transition group-hover:text-teal-500">
            <span>{website}</span>
            <ExternalLink className="ml-0.5 h-3 w-3 shrink-0" />
          </p>
        )}
      </div>
      <p className="relative z-10 mt-2 text-sm text-zinc-600">{description}</p>
    </>
  )

  return (
    <li
      className={`group relative flex flex-col items-start ${websiteUrl ? 'cursor-pointer' : ''}`}
    >
      {websiteUrl ? (
        <Link href={websiteUrl} className="contents" target="_blank" rel="noopener noreferrer">
          <div className="absolute -inset-4 z-0 scale-95 rounded-2xl bg-zinc-50 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 sm:-inset-6" />
          {header}
        </Link>
      ) : (
        header
      )}
      {appStoreUrl && (
        <div className="relative z-10 mt-4">
          <Link
            href={appStoreUrl}
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
      )}
    </li>
  )
}

export function Projects() {
  const [expanded, setExpanded] = useState(false)

  return (
    <Container className="mt-16 md:mt-20">
      <h2 className="flex text-sm font-semibold text-zinc-900">
        <RocketIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Recent Projects</span>
      </h2>

      <ul role="list" className={`mt-10 ${gridClasses}`}>
        {featuredProjects.map((project, index) => (
          <FadeIn key={project.name} delay={index * 50}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </ul>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id="more-projects"
            key="more-projects"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            <ul role="list" className={`mt-16 ${gridClasses}`}>
              {moreProjects.map((project, index) => (
                <FadeIn key={project.name} delay={index * 50}>
                  <ProjectCard project={project} />
                </FadeIn>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12 flex justify-center">
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls="more-projects"
          className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 shadow-sm ring-1 ring-zinc-200 transition hover:bg-zinc-50 hover:ring-zinc-300"
        >
          {expanded ? 'View less' : `View ${moreProjects.length} more`}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </Container>
  )
}
