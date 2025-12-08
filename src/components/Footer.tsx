'use client'

import { EmailPopover } from '@/components/EmailPopover'
import { ContainerInner, ContainerOuter } from '@/components/Container'

export function Footer() {
  return (
    <footer className="flex-none">
      <ContainerOuter>
        <div className="py-12">
          <ContainerInner>
            <div className="flex justify-center">
              <EmailPopover align="center" sideOffset={8}>
                <button className="cursor-pointer text-sm text-zinc-400 transition hover:text-teal-500 dark:text-zinc-500 dark:hover:text-teal-400">
                  Get in touch →
                </button>
              </EmailPopover>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
