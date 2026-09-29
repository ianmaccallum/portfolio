'use client'

import { useSyncExternalStore } from 'react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardContentProps,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { EnvelopeIcon } from '@/components/icons'
import { cn } from '@/lib/utils'

const emails = [
  { label: 'Work', email: 'ian@parra.io' },
  { label: 'Personal', email: 'iancmaccallum@gmail.com' },
]

interface EmailPopoverProps extends HoverCardContentProps {
  children: React.ReactNode
}

function EmailContent() {
  return (
    <>
      <div className="px-2 py-1.5">
        <p className="text-xs font-medium text-zinc-500">
          Get in touch
        </p>
      </div>
      {emails.map(({ label, email }) => (
        <a
          key={email}
          href={`mailto:${email}`}
          className="group flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-zinc-100"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 transition-colors duration-200 group-hover:bg-teal-500">
            <EnvelopeIcon className="h-4 w-4 shrink-0 fill-zinc-500 transition-colors duration-200 group-hover:fill-white" />
          </div>
          <div className="flex shrink-0 flex-col">
            <span className="text-xs font-medium text-zinc-500">
              {label}
            </span>
            <span className="text-sm font-medium text-zinc-800">
              {email}
            </span>
          </div>
        </a>
      ))}
    </>
  )
}

function subscribeToNothing() {
  // Touch capability never changes after load, so there is nothing to
  // subscribe to; this store only exists to read the value safely on
  // the client while matching the server-rendered snapshot on hydration.
  return () => {}
}

function getTouchDeviceSnapshot() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

function getServerTouchDeviceSnapshot() {
  return false
}

export function EmailPopover({ children, ...props }: EmailPopoverProps) {
  const { className, ...propsRest } = props
  const isTouchDevice = useSyncExternalStore(
    subscribeToNothing,
    getTouchDeviceSnapshot,
    getServerTouchDeviceSnapshot
  )

  const contentClassName = cn(
    'w-64 rounded-xl border-zinc-900/5 bg-white p-2 shadow-lg',
    className
  )

  if (isTouchDevice) {
    return (
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className={contentClassName} {...propsRest}>
          <EmailContent />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className={contentClassName} {...propsRest}>
        <EmailContent />
      </HoverCardContent>
    </HoverCard>
  )
}
