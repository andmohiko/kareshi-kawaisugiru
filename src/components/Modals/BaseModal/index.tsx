import { Modal } from '@mantine/core'

import styles from './style.module.css'

type Props = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  size?: '95%' | 'auto'
}

export const BaseModal = ({
  children,
  isOpen,
  onClose,
  size = '95%',
}: Props): React.ReactNode => {
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      size={size}
      closeOnEscape={false}
      overlayProps={{
        blur: 2,
        opacity: 0.9,
      }}
      classNames={{
        header: styles.mantineModalHeader,
      }}
    >
      <div className={styles.body}>{children}</div>
    </Modal>
  )
}
