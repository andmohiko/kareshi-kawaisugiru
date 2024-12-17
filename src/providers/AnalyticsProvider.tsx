import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { createContext, useEffect } from 'react'
import { analytics } from '~/lib/firebase'
import { logEvent } from 'firebase/analytics'

const AnalyticsContext = createContext<{}>({})

const AnalyticsProvider = ({
  children,
}: {
  children: ReactNode
}): ReactNode => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (analytics) {
        logEvent(analytics, 'page_view', {
          page_path: url,
        })
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <AnalyticsContext.Provider value={{}}>{children}</AnalyticsContext.Provider>
  )
}

export { AnalyticsContext, AnalyticsProvider }
