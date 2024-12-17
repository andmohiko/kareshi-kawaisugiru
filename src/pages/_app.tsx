import type { AppProps } from 'next/app'
import 'react-image-crop/dist/ReactCrop.css'

import { BaseHead } from '~/components/Base/BaseHead'
import '~/styles/reset.css'
import '~/styles/globals.css'
import '~/styles/variables.css'
import { Providers } from '~/providers'

// eslint-disable-next-line @typescript-eslint/naming-convention
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <BaseHead />
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
