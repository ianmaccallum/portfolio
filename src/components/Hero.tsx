import Link from 'next/link'

import { Container } from '@/components/Container'
import { EmailPopover } from '@/components/EmailPopover'
import { FadeIn } from '@/components/FadeIn'
import { GitHubIcon, LinkedInIcon, StackOverflowIcon, XIcon } from '@/components/SocialIcons'
import { socialLinks } from '@/lib/info'

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" target="_blank" rel="noopener noreferrer" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600" />
    </Link>
  )
}

export function Hero() {
  return (
    <Container className="mt-9">
      <div className="flex max-w-2xl flex-col items-center sm:items-start">
        <FadeIn delay={300}>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl">
            Ian MacCallum
          </h1>
        </FadeIn>
        <FadeIn delay={400}>
          <div className="mt-6 flex items-center gap-6">
            <SocialLink
              href={socialLinks.x}
              aria-label="Follow on X"
              icon={XIcon}
            />
            <SocialLink
              href={socialLinks.github}
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href={socialLinks.linkedin}
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
            <SocialLink
              href={socialLinks.stackoverflow}
              aria-label="Follow on Stack Overflow"
              icon={StackOverflowIcon}
            />
            <EmailPopover>
              <button
                className="group -m-1 flex items-center p-1 outline-none"
                aria-label="Contact email"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
                  />
                </svg>
              </button>
            </EmailPopover>
          </div>
        </FadeIn>
      </div>
    </Container>
  )
}
