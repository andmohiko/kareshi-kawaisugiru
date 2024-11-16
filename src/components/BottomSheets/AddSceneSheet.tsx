import { Modal } from '@mantine/core'

import { AddSceneForm } from '~/components/Forms/AddSceneForm'
import { TagUI } from '~/entities'

type Props = {
  tags: TagUI[]
  opened: boolean
  onClose: () => void
}

export const AddSceneSheet = ({ tags, opened, onClose }: Props) => (
  <Modal
    opened={opened}
    onClose={onClose}
    withCloseButton
    fullScreen
    transition="slide-up"
    transitionDuration={400}
    transitionTimingFunction="ease"
    overlayColor="#000000"
    overlayOpacity={0.55}
    overlayBlur={3}
    style={{
      borderRadius: '20px 20px 0 0',
      boxShadow: '0px 5px 15px 0px rgba(0, 0, 0, 0.70)',
      margin: '4px 2px 0',
      overflow: 'hidden',
    }}
  >
    <AddSceneForm tags={tags} onClose={onClose} />
  </Modal>
)
