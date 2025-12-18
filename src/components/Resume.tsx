import Link from 'next/link'
import Image, { type ImageProps } from 'next/image'

import { FadeIn } from '@/components/FadeIn'
import { BriefcaseIcon } from '@/components/icons'
import logoParra from '@/images/logos/parra.png'
import logoUniverse from '@/images/logos/universe.png'
import logoStableKernel from '@/images/logos/stable-kernel.png'

interface Role {
  company: string
  title: string
  logo: ImageProps['src']
  url: string
  start: string
  end: string
}

const resume: Array<Role> = [
  {
    company: 'Parra',
    title: 'Founder',
    logo: logoParra,
    url: 'https://parra.io',
    start: '2024',
    end: '2025',
  },
  {
    company: 'Universe (YC W18)',
    title: 'Staff Engineer / Tech Lead / API Lead',
    logo: logoUniverse,
    url: 'https://onuniverse.com',
    start: '2020',
    end: '2024',
  },
  {
    company: 'Stable Kernel',
    title: 'Senior Software Engineer',
    logo: logoStableKernel,
    url: 'https://stablekernel.com',
    start: '2018',
    end: '2020',
  },
]

function Role({ role }: { role: Role }) {
  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5">
        <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900">
          <Link
            href={role.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-teal-500"
          >
            {role.company}
          </Link>
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400"
          aria-label={`${role.start} until ${role.end}`}
        >
          <time dateTime={role.start}>{role.start}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={role.end}>{role.end}</time>
        </dd>
      </dl>
    </li>
  )
}

export function Resume() {
  return (
    <FadeIn>
      <div className="rounded-2xl border border-zinc-100 p-6">
        <h2 className="flex text-sm font-semibold text-zinc-900">
          <BriefcaseIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Work</span>
        </h2>
        <ol className="mt-6 space-y-4">
          {resume.map((role, roleIndex) => (
            <Role key={roleIndex} role={role} />
          ))}
        </ol>
      </div>
    </FadeIn>
  )
}
