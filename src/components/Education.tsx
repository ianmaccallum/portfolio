import Link from 'next/link'
import Image from 'next/image'

import { FadeIn } from '@/components/FadeIn'
import { AcademicCapIcon } from '@/components/icons'
import logoUF from '@/images/logos/uf.png'

export function Education() {
  return (
    <FadeIn>
      <div className="rounded-2xl border border-zinc-100 p-6">
      <h2 className="flex text-sm font-semibold text-zinc-900">
        <AcademicCapIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Education</span>
      </h2>
      <ol className="mt-6 space-y-4">
        <li className="flex gap-4">
          <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5">
            <Image src={logoUF} alt="" className="h-7 w-7" unoptimized />
          </div>
          <dl className="flex flex-auto flex-wrap gap-x-2">
            <dt className="sr-only">University</dt>
            <dd className="w-full flex-none text-sm font-medium text-zinc-900">
              <Link
                href="https://ufl.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-teal-500"
              >
                University of Florida 🐊
              </Link>
            </dd>
            <dt className="sr-only">Degree</dt>
            <dd className="text-xs text-zinc-500">
              Bachelor of Science in Computer Science
            </dd>
            <dt className="sr-only">Date</dt>
            <dd
              className="ml-auto text-xs text-zinc-400"
              aria-label="2013 until 2018"
            >
              <time dateTime="2013">2013</time>{' '}
              <span aria-hidden="true">—</span>{' '}
              <time dateTime="2018">2018</time>
            </dd>
          </dl>
        </li>
      </ol>
      </div>
    </FadeIn>
  )
}
