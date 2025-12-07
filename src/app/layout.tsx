import { type Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { name } from '@/lib/info'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: `%s - ${name}`,
    default: name,
  },
  description: `${name}'s personal website.`,
  openGraph: {
    title: name,
    description: `${name}'s personal website.`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: name,
    description: `${name}'s personal website.`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`h-full antialiased ${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 font-sans dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
