import Link from 'next/link'
import Image from 'next/image'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import downloadAppStore from '@/images/download-app-store.svg'

// Import app icons
import logoThoughtful from '@/images/projects/thoughtful.png'
import logoClaudeDrops from '@/images/projects/claude-drops.png'
import logoTaxDays from '@/images/projects/tax-days.png'
import logoStartupIdeas from '@/images/projects/startup-ideas.png'
import logoGirlMath from '@/images/projects/girl-math.png'
import logoOnlyRecipes from '@/images/projects/only-recipes.png'
import logoCatIQ from '@/images/projects/cat-iq-test.png'
import logoDogIQ from '@/images/projects/dog-iq-test.png'
import logoMojo from '@/images/projects/mojo.png'
import logoGardenFriends from '@/images/projects/garden-friends.png'

type App = {
  name: string
  icon: typeof logoThoughtful
  description: string
  appStoreUrl?: string
  websiteUrl?: string
}

const APPS: App[] = [
  {
    name: 'Thoughtful',
    icon: logoThoughtful,
    description: 'AI-powered greeting cards for the people you care about.',
    appStoreUrl: 'https://apps.apple.com/app/id6762098726',
    websiteUrl: 'https://thoughtful.app',
  },
  {
    name: 'Tax Days',
    icon: logoTaxDays,
    description: 'Tax residency tracker — US federal, state, Schengen 90/180, and the UK SRT in one app.',
    appStoreUrl: 'https://apps.apple.com/app/id6761441335',
  },
  {
    name: 'Garden Friends',
    icon: logoGardenFriends,
    description: 'Discover, identify, taste, track, and build boards for wines and cocktails.',
    appStoreUrl: 'https://apps.apple.com/app/id6765847221',
  },
  {
    name: 'Ideas',
    icon: logoStartupIdeas,
    description: 'A simple, beautiful place to capture every startup idea before it slips away.',
    appStoreUrl: 'https://apps.apple.com/app/id6761696994',
  },
  {
    name: 'Girl Math',
    icon: logoGirlMath,
    description: 'Track returns and unused purchases — never lose money to a forgotten receipt again.',
    appStoreUrl: 'https://apps.apple.com/app/id6761315341',
  },
  {
    name: 'Only Recipes',
    icon: logoOnlyRecipes,
    description: 'Instantly extract just the recipe — from any website, with one click.',
    appStoreUrl: 'https://apps.apple.com/us/app/only-recipes/id1553858589',
    websiteUrl: 'https://onlyrecipes.app',
  },
  {
    name: 'Cat IQ Test',
    icon: logoCatIQ,
    description: 'Silly app to quiz your cat\'s intelligence and generate an official IQ certificate.',
    appStoreUrl: 'https://apps.apple.com/app/id6759520249',
  },
  {
    name: 'Dog IQ Test',
    icon: logoDogIQ,
    description: 'Silly app to quiz your dog\'s intelligence and generate an official IQ certificate.',
    appStoreUrl: 'https://apps.apple.com/app/id6759539103',
  },
  {
    name: 'Claude Drops',
    icon: logoClaudeDrops,
    description: 'Never miss a Claude Code release — changelog, notifications, and widgets.',
    appStoreUrl: 'https://apps.apple.com/app/id6760681118',
  },
  {
    name: 'Mojo Score Keeper',
    icon: logoMojo,
    description: 'Clean, intuitive score keeper for the card game Mojo.',
    appStoreUrl: 'https://apps.apple.com/us/app/mojo-score-keeper/id6749283633',
  },
]

function AppIcon({ src }: { src: typeof logoThoughtful }) {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-zinc-900/5">
      <Image
        src={src}
        alt=""
        className="h-full w-full object-cover"
        unoptimized
      />
    </div>
  )
}

export function Apps() {
  return (
    <Container className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            My Apps
          </h1>
          <p className="mt-4 text-lg text-zinc-600">
            A collection of iOS apps and tools I've built, available on the App Store and the web.
          </p>
        </div>

        <ul
          role="list"
          className="grid gap-8 sm:gap-6"
        >
          {APPS.map((app, index) => (
            <FadeIn key={app.name} delay={index * 50}>
              <li className="group relative flex flex-col sm:flex-row sm:items-start gap-4 rounded-2xl border border-zinc-200 p-6 transition hover:border-zinc-300 hover:bg-zinc-50">
                <div className="flex-shrink-0">
                  <AppIcon src={app.icon} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {app.name}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                    {app.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {app.appStoreUrl && (
                      <Link
                        href={app.appStoreUrl}
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
                    )}
                    {app.websiteUrl && (
                      <Link
                        href={app.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
                      >
                        Visit Site
                        <span className="text-xs">↗</span>
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </Container>
  )
}
