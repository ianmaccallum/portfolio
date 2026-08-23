import { description, name, siteUrl, socialLinks } from '@/lib/info'

// Curated Markdown site map for LLM crawlers (ChatGPT, Claude, Perplexity,
// Gemini). The site is fully static, so this is prerendered at build time.
// Keep the page list in sync with src/app/sitemap.ts.
export const dynamic = 'force-static'

export function GET() {
  const body = `# ${name}

> ${description}

Ian MacCallum is a software engineer and founder. He is currently Principal
Software Engineer at Stable Kernel, was the founder of Parra (2024 to 2025), and
before that was Staff Engineer, Tech Lead, and API Lead at Universe (YC W18)
from 2020 to 2024. He was also Senior Software Engineer at Stable Kernel from
2018 to 2020. He holds a Bachelor of Science in Computer Science from the
University of Florida (2013 to 2018).

## Pages

- [Home](${siteUrl}/): Bio, featured projects, work history, and education.
- [My Apps](${siteUrl}/apps): A collection of iOS apps and tools he has built, available on the App Store and the web.

## Files

- [Resume (PDF)](${siteUrl}/Resume_IanMacCallum.pdf): Full work history, last updated January 13, 2026.

## Elsewhere

- [X](${socialLinks.x})
- [GitHub](${socialLinks.github})
- [LinkedIn](${socialLinks.linkedin})
- [Stack Overflow](${socialLinks.stackoverflow})
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
