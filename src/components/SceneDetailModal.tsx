import { Modal, Title, useMantineTheme } from '@mantine/core'

import { SceneDetailCard } from '~/components/SceneDetailCard'
import { Scene } from '~/entities'

interface Props {
  scene: Scene
  opened: boolean
  onClose: () => void
}

export const SceneDetailModal = ({
  scene,
  opened,
  onClose,
}: Props): React.ReactElement => {
  const theme = useMantineTheme()
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Title order={3}>{scene.title}</Title>}
      centered
      padding="lg"
      overlayColor={theme.colors.gray[1]}
      overlayOpacity={0.2}
      overlayBlur={4}
    >
      <SceneDetailCard scene={scene} />
    </Modal>
  )
}
