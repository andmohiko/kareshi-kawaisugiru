import type { ReactNode } from 'react'
import { createContext, useState, useContext } from 'react'

const LoadingContext = createContext<{
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
}>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
})

const LoadingProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const startLoading = () => setIsLoading(true)

  const stopLoading = () => setIsLoading(false)

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export { LoadingContext, LoadingProvider }

export const useLoadingContext = () => useContext(LoadingContext)
