import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'

import type { AppProps } from 'next/app'

import { HeadComponent } from '~/components/Head'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <HeadComponent />
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <NotificationsProvider position="top-center">
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </>
  )
}

export default MyApp
