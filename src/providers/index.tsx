import { MantineProvider } from '~/providers/MantineProvider'
import { LoadingProvider } from '~/providers/LoadingProvider'
import { FirebaseAuthProvider } from '~/providers/FirebaseAuthProvider'
import { UserProvider } from '~/providers/UserProvider'

type Props = {
  children: React.ReactNode
}

export const Providers = ({ children }: Props): React.ReactNode => {
  return (
    <MantineProvider>
      <LoadingProvider>
        <FirebaseAuthProvider>
          <UserProvider>{children}</UserProvider>
        </FirebaseAuthProvider>
      </LoadingProvider>
    </MantineProvider>
  )
}
