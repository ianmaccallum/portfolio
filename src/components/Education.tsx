import Link from 'next/link'
import Image from 'next/image'

import logoUF from '@/images/logos/uf.png'

function AcademicCapIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
    </svg>
  )
}

export function Education() {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <AcademicCapIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Education</span>
      </h2>
      <ol className="mt-6 space-y-4">
        <li className="flex gap-4">
          <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
            <Image src={logoUF} alt="" className="h-7 w-7" unoptimized />
          </div>
          <dl className="flex flex-auto flex-wrap gap-x-2">
            <dt className="sr-only">University</dt>
            <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
              <Link
                href="https://ufl.edu"
                className="transition hover:text-teal-500 dark:hover:text-teal-400"
              >
                University of Florida
              </Link>
            </dd>
            <dt className="sr-only">Degree</dt>
            <dd className="text-xs text-zinc-500 dark:text-zinc-400">
              Bachelor of Science in Computer Science
            </dd>
            <dt className="sr-only">Date</dt>
            <dd
              className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
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
  )
}
