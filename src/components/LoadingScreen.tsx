import { Loader, Stack } from '@mantine/core'

import { SimpleLayout } from '~/components/Layouts/SimpleLayout'

export const LoadingScreen = () => (
  <SimpleLayout>
    <Stack
      justify="center"
      align="center"
      style={{
        height: '100vh',
      }}
    >
      <Loader size={60} />
    </Stack>
  </SimpleLayout>
)
