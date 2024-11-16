import { CopyButton, ActionIcon, Tooltip, useMantineTheme } from '@mantine/core'
import { IconCopy, IconCheck } from '@tabler/icons'
import { increment } from 'firebase/firestore'

import { Scene } from '~/entities'
import { useUpdateScene } from '~/hooks/useScenes'
import { serverTimestamp } from '~/lib/firebase'

type Props = {
  scene: Scene
}

export const CopyLinkButton = ({ scene }: Props) => {
  const theme = useMantineTheme()
  const updateScene = useUpdateScene()
  const shareUrl = `https://tokai-db.vercel.app/scenes/${scene.sceneId}`

  return (
    <CopyButton value={shareUrl} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip
          label={copied ? 'コピー完了' : 'コピーする'}
          withArrow
          position="right"
        >
          <ActionIcon
            color={copied ? 'teal' : 'gray'}
            onClick={() => {
              copy()
              updateScene(scene.sceneId, {
                shares: increment(1),
                updatedAt: serverTimestamp,
              })
            }}
            style={{
              border: '1px solid',
              borderColor: copied ? theme.colors.teal[4] : theme.colors.gray[5],
              fontSize: 12,
              gap: 4,
              padding: 0,
              width: 120,
            }}
          >
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
            リンクコピー
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  )
}
