import { AppShell, Header, Stack, Title } from '@mantine/core'

import Footer from '~/components/Footer'
import { HeadComponent } from '~/components/Head'

type Props = {
  children: React.ReactNode
}

export const NoPlusLayout = ({ children }: Props) => (
  <AppShell
    padding="md"
    header={
      <Header height={60} p="xs">
        <Title order={1}>東海スクショDB</Title>
      </Header>
    }
    styles={(theme) => ({
      main: {
        backgroundColor: theme.colors.gray[0],
        position: 'relative',
      },
    })}
  >
    <HeadComponent />

    <Stack
      align="center"
      style={{
        height: '100%',
        minHeight: 'calc(100vh - 200px)',
      }}
    >
      <Stack
        style={{
          maxWidth: 720,
        }}
      >
        {children}
      </Stack>
    </Stack>

    <Footer />
  </AppShell>
)
