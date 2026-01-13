import Link from 'next/link'
import { Download } from 'lucide-react'

import { FadeIn } from '@/components/FadeIn'
import { FileTextIcon } from '@/components/icons'

export function ResumeDownload() {
  return (
    <FadeIn>
      <div className="rounded-2xl border border-zinc-100 p-6">
        <h2 className="flex text-sm font-semibold text-zinc-900">
          <FileTextIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Resume</span>
        </h2>
        <p className="mt-4 text-xs text-zinc-500">
          Last updated January 13, 2026
        </p>
        <Link
          href="/Resume_IanMacCallum.pdf"
          download
          className="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-zinc-50 py-2 px-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60"
        >
          Download
          <Download className="h-4 w-4 transition group-hover:translate-y-0.5" />
        </Link>
      </div>
    </FadeIn>
  )
}
