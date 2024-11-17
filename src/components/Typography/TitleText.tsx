import { Title } from '@mantine/core'

type Props = {
  children: React.ReactNode
  level?: 1 | 2 | 3
}

export const TitleText = ({
  children,
  level = 1,
}: Props): React.ReactElement => {
  return (
    <Title order={level} style={{ marginBottom: 16 }}>
      {children}
    </Title>
  )
}
