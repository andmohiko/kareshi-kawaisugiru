import { Group, Image, Stack, Text } from '@mantine/core'

import { TagLabel } from '~/components/Buttons/TagButton'
import { Scene } from '~/entities'

interface Props {
  scene: Scene
}

export const SceneCard = ({ scene }: Props): React.ReactElement => (
  <Stack spacing="xs" align="center">
    <Image
      src={scene.screenshotURL}
      alt={scene.title}
      height={190}
      width="auto"
      withPlaceholder
    />
    <Text size="xl">{scene.title}</Text>
    <Group
      spacing="xs"
      style={{
        maxWidth: 360,
      }}
    >
      {scene.tags.map((tag) => (
        <TagLabel key={tag} tagLabel={tag} />
      ))}
    </Group>
  </Stack>
)
