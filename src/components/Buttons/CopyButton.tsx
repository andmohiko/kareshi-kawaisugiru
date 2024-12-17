import {
  ActionIcon,
  Button,
  CopyButton as MantineCopyButton,
} from '@mantine/core'
import { IoLinkSharp } from 'react-icons/io5'

import type { ButtonImportance, ButtonSize } from '~/components/Buttons/types'
import { getButtonVariant, buttonColor } from '~/components/Buttons/types'

type Props = {
  children: React.ReactNode
  copyText: string
  importance?: ButtonImportance
  size?: ButtonSize
  disabled?: boolean
  width?: string
  fullWidth?: boolean
}

export const CopyButton = ({
  children,
  copyText,
  importance = 'primary',
  size = 'md',
  disabled = false,
  width,
  fullWidth = false,
}: Props): React.ReactNode => {
  const copiedImportance = importance === 'primary' ? 'secondary' : 'primary'
  return (
    <MantineCopyButton value={copyText}>
      {({ copied, copy }) => (
        <Button
          onClick={copy}
          variant={
            copied
              ? getButtonVariant(copiedImportance)
              : getButtonVariant(importance)
          }
          disabled={disabled}
          color={buttonColor}
          w={width}
          fullWidth={fullWidth}
          size={size}
          leftSection={<IoLinkSharp />}
          style={{
            backgroundColor: copied ? undefined : 'var(--color-bg-white)',
          }}
        >
          {copied ? 'コピーしました' : children}
        </Button>
      )}
    </MantineCopyButton>
  )
}

export const CopyIconButton = ({
  copyText,
  importance = 'primary',
  size = 'lg',
  disabled = false,
}: Omit<Props, 'children' | 'width' | 'fullWidth'>): React.ReactNode => {
  const copiedImportance = importance === 'primary' ? 'secondary' : 'primary'
  return (
    <MantineCopyButton value={copyText}>
      {({ copied, copy }) => (
        <ActionIcon
          onClick={copy}
          variant={
            copied
              ? getButtonVariant(copiedImportance)
              : getButtonVariant(importance)
          }
          disabled={disabled}
          color={buttonColor}
          size={size}
          style={{
            backgroundColor: copied ? undefined : 'var(--color-bg-white)',
          }}
        >
          <IoLinkSharp size={20} />
        </ActionIcon>
      )}
    </MantineCopyButton>
  )
}
