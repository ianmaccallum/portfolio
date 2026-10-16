'use client'

import { createContext, useState } from 'react'
import { usePathname } from 'next/navigation'

function usePrevious<T>(value: T) {
  let [state, setState] = useState<{ value: T; previous: T | undefined }>({
    value,
    previous: undefined,
  })

  if (value !== state.value) {
    setState({ value, previous: state.value })
  }

  return state.previous
}

export const AppContext = createContext<{ previousPathname?: string }>({})

export function Providers({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()
  let previousPathname = usePrevious(pathname)

  return (
    <AppContext.Provider value={{ previousPathname }}>
      {children}
    </AppContext.Provider>
  )
}
