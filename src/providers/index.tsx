import { MantineProvider } from '~/providers/MantineProvider'
import { LoadingProvider } from '~/providers/LoadingProvider'
import { FirebaseAuthProvider } from '~/providers/FirebaseAuthProvider'
import { UserProvider } from '~/providers/UserProvider'
import { AnalyticsProvider } from '~/providers/AnalyticsProvider'

type Props = {
  children: React.ReactNode
}

export const Providers = ({ children }: Props): React.ReactNode => {
  return (
    <MantineProvider>
      <LoadingProvider>
        <AnalyticsProvider>
          <FirebaseAuthProvider>
            <UserProvider>{children}</UserProvider>
          </FirebaseAuthProvider>
        </AnalyticsProvider>
      </LoadingProvider>
    </MantineProvider>
  )
}
