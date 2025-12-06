'use client'

import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'

function EnvelopeIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

const emails = [
  { label: 'Work', email: 'ian@parra.io' },
  { label: 'Personal', email: 'iancmaccallum@gmail.com' },
]

export function EmailPopover() {
  return (
    <Popover className="relative">
      <PopoverButton
        className="group -m-1 p-1 outline-none"
        aria-label="Contact email"
      >
        <EnvelopeIcon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom start"
        className="z-50 mt-3 w-56 origin-top-left rounded-xl bg-white p-2 shadow-lg ring-1 ring-zinc-900/5 transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 dark:bg-zinc-900 dark:ring-zinc-800"
      >
        <div className="px-2 py-1.5">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Get in touch
          </p>
        </div>
        {emails.map(({ label, email }) => (
          <a
            key={email}
            href={`mailto:${email}`}
            className="group flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 transition group-hover:bg-teal-500 dark:bg-zinc-800 dark:group-hover:bg-teal-500">
              <EnvelopeIcon className="h-4 w-4 shrink-0 fill-zinc-500 transition group-hover:fill-white dark:fill-zinc-400 dark:group-hover:fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {label}
              </span>
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {email}
              </span>
            </div>
          </a>
        ))}
      </PopoverPanel>
    </Popover>
  )
}
