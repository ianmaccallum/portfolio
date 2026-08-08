/**
 * Apple campaign attribution for App Store links.
 *
 * This site is a cross-app directory: it links to every app in the portfolio,
 * which makes it one of the highest-leverage referrers there is. Without `pt`
 * and `ct` on those links Apple cannot tell a portfolio-driven install from an
 * organic one, and every install it drives is invisible in App Store Connect >
 * App Analytics > Campaigns.
 *
 * Applied at the render site rather than baked into each URL, so the app lists
 * stay plain data and no one has to remember to append the params when adding
 * an entry.
 */

/** Shared Parra provider token (App Store Connect > App Analytics > Campaigns). */
export const APP_STORE_PROVIDER_TOKEN =
  process.env.NEXT_PUBLIC_APP_STORE_PT ?? '128415653'

/**
 * Add `pt`/`ct` campaign attribution to an apps.apple.com URL.
 *
 * Non-App Store URLs are returned untouched, and existing query params are
 * preserved. `ct` is prefixed with `web_` and capped at Apple's 40-character
 * limit. A malformed URL is returned as-is rather than throwing, because a
 * marketing link is never worth crashing a page render over.
 */
export function withAppStoreCampaign(url: string, campaign: string): string {
  if (!url.includes('apps.apple.com')) return url
  try {
    const u = new URL(url)
    u.searchParams.set('pt', APP_STORE_PROVIDER_TOKEN)
    u.searchParams.set('ct', `web_${campaign}`.slice(0, 40))
    if (!u.searchParams.has('mt')) u.searchParams.set('mt', '8')
    return u.toString()
  } catch {
    return url
  }
}

/** Slugify an app name into a `ct`-safe campaign segment. */
export function campaignFor(surface: string, appName: string): string {
  const slug = appName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
  return `${surface}_${slug}`
}
