import {
  Anchor,
  Divider,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core'

const Footer = (): React.ReactElement => {
  const theme = useMantineTheme()
  return (
    <Stack>
      <Divider />
      <Group
        position="apart"
        style={{
          padding: '0 8px 16px',
        }}
      >
        <Group
          style={{
            color: theme.colors.gray[4],
            textAlign: 'center',
          }}
        >
          <Anchor href="https://www.notion.so/andmohiko/f6e879d78c20411c83a1cd0830158e03">
            利用規約
          </Anchor>
          <Divider size="xs" orientation="vertical" />
          <Anchor href="https://forms.gle/ZhVECm34dnmzJBYK9">お問い合せ</Anchor>
        </Group>
        <Text>
          <small>© 2022 andmohiko</small>
        </Text>
      </Group>
    </Stack>
  )
}

export default Footer
