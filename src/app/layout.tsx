import { type Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { name, siteUrl, description } from '@/lib/info'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s - ${name}`,
    default: name,
  },
  description,
  keywords: [
    'Ian MacCallum',
    'software engineer',
    'iOS developer',
    'full stack developer',
    'Parra',
    'Swift',
    'TypeScript',
    'React',
    'Next.js',
  ],
  authors: [{ name, url: siteUrl }],
  creator: name,
  openGraph: {
    title: name,
    description,
    url: siteUrl,
    siteName: name,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: name,
    description,
    creator: '@iancmaccallum',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: 'your-verification-code',
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
