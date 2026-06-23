'use client'

import { useState } from 'react'
import { Container } from '@/components/Container'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <Container className="mt-24 md:mt-28">
      <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Stay in touch
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Get updates on new projects, side experiments, and what I'm reading.
        </p>

        {submitted ? (
          <p className="mt-4 text-sm font-semibold text-green-600 dark:text-green-400">
            ✓ Thanks! You're subscribed.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              aria-label="Email address"
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-zinc-100 outline-offset-2 transition hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70"
            >
              Join
            </button>
          </form>
        )}
      </div>
    </Container>
  )
}
