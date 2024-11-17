import type { AppProps } from 'next/app'

import '~/styles/reset.css'
import '~/styles/globals.css'
import '~/styles/variables.css'
import { Providers } from '~/providers'

// eslint-disable-next-line @typescript-eslint/naming-convention
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
