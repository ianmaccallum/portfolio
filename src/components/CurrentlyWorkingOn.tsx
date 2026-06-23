import { Container } from '@/components/Container'

const projects = [
  {
    name: 'Skipper',
    status: 'Live · iOS',
    description: 'Boat maintenance log + surveyor-grade PDF reports',
  },
  {
    name: 'Tax Days',
    status: 'Live · iOS',
    description: 'Tax residency day tracker for digital nomads',
  },
  {
    name: 'Thoughtful',
    status: 'Live · iOS',
    description: 'Relationship management for the rest of us',
  },
]

export function CurrentlyWorkingOn() {
  return (
    <Container className="mt-24 md:mt-28">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Currently working on
        </h2>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium dark:bg-green-500/10 dark:text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Building
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.name}
            className="group rounded-2xl border border-zinc-100 p-5 hover:border-zinc-200 transition-colors dark:border-zinc-700/40 dark:hover:border-zinc-700"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {project.name}
              </h3>
              <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800">
                {project.status}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </Container>
  )
}
