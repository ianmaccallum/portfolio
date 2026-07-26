import { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/info'

// Every publicly indexable page. Keep this in sync when routes are added or
// removed: it is what Google crawls and what the IndexNow deploy step diffs
// against the previous deploy (see scripts/indexnow-submit.mjs).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/apps`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
