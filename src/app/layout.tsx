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
}

// Script that runs before body to prevent any flash
// This must match the logic in next-themes
const themeInitScript = `
(function() {
  function getTheme() {
    try {
      var stored = localStorage.getItem('theme');
      if (stored === 'dark') return 'dark';
      if (stored === 'light') return 'light';
      // stored is 'system' or null, use system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (e) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  }
  var theme = getTheme();
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`h-full antialiased ${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
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
