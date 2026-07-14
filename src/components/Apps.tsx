import Link from 'next/link'
import Image from 'next/image'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import downloadAppStore from '@/images/download-app-store.svg'

// Import app icons
import logoOnlyRecipes from '@/images/projects/only-recipes.png'
import logoTaxDays from '@/images/projects/tax-days.png'
import logoDIY from '@/images/projects/diy.png'
import logoGLPDone from '@/images/projects/glp-done.png'
import logoThoughtful from '@/images/projects/thoughtful.png'
import logoClaudeDrops from '@/images/projects/claude-drops.png'
import logoSlashCards from '@/images/projects/slash-cards.png'
import logoSkimmer from '@/images/projects/skimmer.png'
import logoSkipper from '@/images/projects/skipper.png'
import logoCarNotes from '@/images/projects/car-notes.png'
import logoPlastik from '@/images/projects/plastik.png'
import logoGirlMath from '@/images/projects/girl-math.png'
import logoIdeas from '@/images/projects/ideas.png'
import logoNotiFi from '@/images/projects/notifi.png'
import logoNoContext from '@/images/projects/no-context.svg'
import logoY2K38 from '@/images/projects/y2k38.png'
import logoCatIQ from '@/images/projects/cat-iq-test.png'
import logoDogIQ from '@/images/projects/dog-iq-test.png'
import logoPwd from '@/images/projects/pwd.png'
import logoDateTime from '@/images/projects/datetime.png'
import logoRiemannSums from '@/images/projects/riemann-sums.png'

type App = {
  name: string
  icon: typeof logoThoughtful
  description: string
  appStoreUrl?: string
  websiteUrl?: string
}

/**
 * Every app here is live: shipped on the App Store, or a live web product.
 * App IDs come from App Store Connect; ordering mirrors parra.io.
 */
const APPS: App[] = [
  {
    name: 'Only Recipes',
    icon: logoOnlyRecipes,
    description: 'Instantly extract just the recipe from any website, with one click.',
    appStoreUrl: 'https://apps.apple.com/us/app/only-recipes-recipe-keeper/id1553858589',
    websiteUrl: 'https://onlyrecipes.app',
  },
  {
    name: 'Tax Days',
    icon: logoTaxDays,
    description: 'Track tax residency days against US federal, state, and international rules.',
    appStoreUrl: 'https://apps.apple.com/us/app/tax-days-residency-tracker/id6761441335',
    websiteUrl: 'https://taxdaysresidencytracker.com',
  },
  {
    name: 'DIYProject.ai',
    icon: logoDIY,
    description: 'AI-powered project planner and home maintenance tracker.',
    websiteUrl: 'https://diyproject.ai',
  },
  {
    name: 'GLP-Done',
    icon: logoGLPDone,
    description: 'Keep the weight off after GLP-1. Private, on-device maintenance coaching.',
    appStoreUrl: 'https://apps.apple.com/us/app/glp-done-keep-it-off/id6785238079',
    websiteUrl: 'https://glp-done.com',
  },
  {
    name: 'Thoughtful',
    icon: logoThoughtful,
    description: 'Never miss a birthday. Gift ideas, occasions, and the people who matter.',
    appStoreUrl: 'https://apps.apple.com/us/app/thoughtful-grow-relationships/id6762098726',
    websiteUrl: 'https://thoughtful.app',
  },
  {
    name: 'Drops for Claude Code',
    icon: logoClaudeDrops,
    description: 'Every Claude Code release, explained. Never miss a new feature.',
    appStoreUrl: 'https://apps.apple.com/us/app/drops-for-claude-code/id6760681118',
  },
  {
    name: '/cards for Claude Code',
    icon: logoSlashCards,
    description: 'Flashcards for Claude Code commands, hooks, and config.',
    appStoreUrl: 'https://apps.apple.com/us/app/cards-for-claude-code/id6770581039',
  },
  {
    name: 'Skimmer',
    icon: logoSkimmer,
    description: 'Pool care log for water chemistry, equipment, and service history.',
    appStoreUrl: 'https://apps.apple.com/us/app/skimmer-pool-care-log/id6775022955',
  },
  {
    name: 'Skipper',
    icon: logoSkipper,
    description: 'Boat maintenance log with engine hours and resale-ready PDF reports.',
    appStoreUrl: 'https://apps.apple.com/us/app/skipper-boat-maintenance-log/id6770317576',
  },
  {
    name: 'Car Notes',
    icon: logoCarNotes,
    description: 'Voice-first notes for drivers. Capture a thought, hands on the wheel.',
    appStoreUrl: 'https://apps.apple.com/us/app/car-notes-voice-memos/id6770357166',
  },
  {
    name: 'Plastik',
    icon: logoPlastik,
    description: 'Every loyalty and membership barcode, organized in one wallet.',
    appStoreUrl: 'https://apps.apple.com/us/app/plastik-barcode-card-wallet/id6765938401',
  },
  {
    name: 'Girl Math',
    icon: logoGirlMath,
    description: 'Track returns, deadlines, and refunds so you never eat the cost.',
    appStoreUrl: 'https://apps.apple.com/us/app/girl-math-return-tracker/id6761315341',
  },
  {
    name: 'Ideas',
    icon: logoIdeas,
    description: 'Capture startup ideas the moment they hit, then grow the good ones.',
    appStoreUrl: 'https://apps.apple.com/us/app/ideas-simple-idea-tracker/id6761696994',
  },
  {
    name: 'NotiFi',
    icon: logoNotiFi,
    description: 'Get alerted the moment UniFi gear is back in stock.',
    appStoreUrl: 'https://apps.apple.com/us/app/notifi-stock-alerts-for-unifi/id6771999708',
  },
  {
    name: 'No Context Bot',
    icon: logoNoContext,
    description: 'A Slack bot that turns out-of-context quotes into AI-generated art.',
    websiteUrl: 'https://nocontextbot.com',
  },
  {
    name: 'Y2K38',
    icon: logoY2K38,
    description: 'A doomsday clock counting down to the 32-bit epoch overflow.',
    appStoreUrl: 'https://apps.apple.com/us/app/y2k38-doomsday-clock/id6762413449',
  },
  {
    name: 'Cat IQ Test',
    icon: logoCatIQ,
    description: 'Quiz your cat, then print the official certificate of genius.',
    appStoreUrl: 'https://apps.apple.com/us/app/cat-iq-test/id6759520249',
  },
  {
    name: 'Dog IQ Test',
    icon: logoDogIQ,
    description: 'Quiz your dog, then print the official certificate of genius.',
    appStoreUrl: 'https://apps.apple.com/us/app/dog-iq-test-pup-quiz/id6759539103',
  },
  {
    name: 'pwd',
    icon: logoPwd,
    description: 'Strong, memorable passwords generated on device.',
    appStoreUrl: 'https://apps.apple.com/us/app/pwd-password-generator/id1508070176',
  },
  {
    name: 'DateTime',
    icon: logoDateTime,
    description: 'A quick reference for every date format a developer needs.',
    appStoreUrl: 'https://apps.apple.com/us/app/datetime-date-formatter/id1510255768',
  },
  {
    name: 'Riemann Sums',
    icon: logoRiemannSums,
    description: 'Visualize and calculate Riemann sums for any function.',
    appStoreUrl: 'https://apps.apple.com/us/app/riemann-sums-calculator/id1508062942',
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
