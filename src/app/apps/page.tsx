import { Metadata } from 'next'
import { Apps } from '@/components/Apps'
import { ContactCTA } from '@/components/ContactCTA'

export const metadata: Metadata = {
  title: 'My Apps',
  description: 'A collection of iOS apps and tools I\'ve built, available on the App Store and the web.',
}

export default function AppsPage() {
  return (
    <>
      <Apps />
      <ContactCTA />
    </>
  )
}
