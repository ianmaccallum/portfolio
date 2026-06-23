import { Container } from '@/components/Container'

const testimonials = [
  {
    quote:
      "Ian ships fast and thinks about the user experience first. The kind of engineer every team needs.",
    author: "Former Colleague",
    role: "Engineering Lead",
  },
  {
    quote:
      "His ability to take a vague product idea and turn it into a production-ready iOS app in a week is remarkable.",
    author: "Tech Founder",
    role: "CEO, B2B SaaS",
  },
  {
    quote:
      "Ian brings a rare mix of design sensibility and technical depth. Both his code and his interfaces ship beautifully.",
    author: "Design Director",
    role: "Product Studio",
  },
]

export function Testimonials() {
  return (
    <Container className="mt-24 md:mt-28">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        What people say
      </h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure
            key={i}
            className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm dark:border-zinc-700/40 dark:bg-zinc-800/50"
          >
            <blockquote className="text-sm text-zinc-600 dark:text-zinc-400">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-700/40">
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {t.author}
              </div>
              <div className="text-xs text-zinc-500">{t.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Container>
  )
}
