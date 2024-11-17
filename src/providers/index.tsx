import { MantineProvider } from '~/providers/MantineProvider'
import { LoadingProvider } from '~/providers/LoadingProvider'
import { FirebaseAuthProvider } from '~/providers/FirebaseAuthProvider'

type Props = {
  children: React.ReactNode
}

export const Providers = ({ children }: Props): React.ReactNode => {
  return (
    <MantineProvider>
      <LoadingProvider>
        <FirebaseAuthProvider>{children}</FirebaseAuthProvider>
      </LoadingProvider>
    </MantineProvider>
  )
}
