import Link from 'next/link'

import { Container } from '@/components/Container'
import { EmailPopover } from '@/components/EmailPopover'
import { GitHubIcon, LinkedInIcon, XIcon } from '@/components/SocialIcons'
import { socialLinks } from '@/lib/info'

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

export function Hero() {
  return (
    <Container className="mt-9">
      <div className="flex max-w-2xl flex-col items-center sm:items-start">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Ian MacCallum
        </h1>
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
          <EmailPopover />
        </div>
      </div>
    </Container>
  )
}
