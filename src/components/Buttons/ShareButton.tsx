import { ActionIcon, Button } from '@mantine/core'
import { FaXTwitter } from 'react-icons/fa6'

import type { ButtonImportance, ButtonSize } from '~/components/Buttons/types'
import { getButtonVariant, buttonColor } from '~/components/Buttons/types'

const hashtags = ['彼氏がかわいすぎる', '彼氏がかわいすぎるどっとこむ']

const createShareUrl = (url: string): string => {
  const shareUrl = new URL('http://x.com/share')
  const urlParams = [
    ['url', encodeURIComponent(url)],
    ['hashtags', hashtags.join(',')],
  ]
  const params = new URLSearchParams(urlParams)
  shareUrl.search = params.toString()
  return shareUrl.toString()
}

type Props = {
  children: React.ReactNode
  shareUrl: string
  importance?: ButtonImportance
  size?: ButtonSize
  disabled?: boolean
  width?: string
  fullWidth?: boolean
}

export const ShareButton = ({
  children,
  shareUrl,
  importance = 'primary',
  size = 'md',
  disabled = false,
  width,
  fullWidth = false,
}: Props): React.ReactNode => {
  return (
    <Button
      component="a"
      target="_blank"
      rel="noopener noreferrer"
      href={createShareUrl(shareUrl)}
      variant={getButtonVariant(importance)}
      disabled={disabled}
      color={buttonColor}
      w={width}
      fullWidth={fullWidth}
      size={size}
      leftSection={<FaXTwitter />}
    >
      {children}
    </Button>
  )
}

export const ShareIconButton = ({
  shareUrl,
  importance = 'primary',
  size = 'lg',
  disabled = false,
}: Omit<Props, 'children' | 'width' | 'fullWidth'>): React.ReactNode => {
  return (
    <ActionIcon
      component="a"
      target="_blank"
      rel="noopener noreferrer"
      href={createShareUrl(shareUrl)}
      variant={getButtonVariant(importance)}
      disabled={disabled}
      color={buttonColor}
      size={size}
    >
      <FaXTwitter size={20} />
    </ActionIcon>
  )
}
