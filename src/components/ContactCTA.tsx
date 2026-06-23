import { Container } from '@/components/Container'

export function ContactCTA() {
  return (
    <Container className="mt-24 md:mt-28">
      <div className="rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-10 text-center dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-100">
        <h2 className="text-2xl md:text-3xl font-bold text-white dark:text-zinc-900">
          Let's build something together
        </h2>
        <p className="mt-3 text-zinc-300 max-w-md mx-auto dark:text-zinc-700">
          Open to consulting, freelance work, and interesting collaborations.
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <a
            href="mailto:iancmaccallum@gmail.com"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 transition-colors dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
          >
            Get in touch
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors dark:border-zinc-900/20 dark:text-zinc-900 dark:hover:bg-zinc-900/10"
          >
            See more work
          </a>
        </div>
      </div>
    </Container>
  )
}
