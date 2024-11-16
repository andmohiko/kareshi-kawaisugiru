import { Group, Image, Stack, Text } from '@mantine/core'

import { CopyLinkButton } from './Buttons/CopyLinkButton'

import { TagLabel } from '~/components/Buttons/TagButton'
import { TweetButton } from '~/components/Buttons/TweetButton'
import { Scene } from '~/entities'

interface Props {
  scene: Scene
}

export const SceneDetailCard = ({ scene }: Props): React.ReactElement => {
  return (
    <Stack spacing="xl">
      <Image src={scene.screenshotURL} alt={scene.title} />
      <Stack spacing="xs">
        <Stack
          style={{
            gap: 0,
          }}
        >
          <Text
            style={{
              color: '#777',
              fontSize: 11,
            }}
          >
            このシーンの動画
          </Text>
          <Text size="xl">{scene.videoName}</Text>
        </Stack>
        <Group spacing="xs">
          {scene.tags.map((tag) => (
            <TagLabel key={tag} tagLabel={tag} />
          ))}
        </Group>
      </Stack>
      <Group>
        <TweetButton scene={scene} />
        <CopyLinkButton scene={scene} />
      </Group>
    </Stack>
  )
}
