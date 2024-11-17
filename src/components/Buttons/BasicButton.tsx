import { Button } from '@mantine/core'
import Link from 'next/link'

import type { ButtonImportance, ButtonSize } from '~/components/Buttons/types'
import { getButtonVariant, buttonColor } from '~/components/Buttons/types'
import { isExternalLink } from '~/components/Navigations/LinkItem'

type Props = {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  target?: '_self' | '_blank'
  importance?: ButtonImportance
  size?: ButtonSize
  leftSection?: React.ReactNode
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit'
  width?: string
  fullWidth?: boolean
}

export const BasicButton = ({
  children,
  onClick,
  href,
  target = '_self',
  importance = 'primary',
  size = 'md',
  leftSection,
  disabled = false,
  loading = false,
  type = 'button',
  width,
  fullWidth = false,
}: Props): React.ReactNode => {
  // hrefがあるときはaタグとして動作する
  if (href) {
    return isExternalLink(href) ? (
      <Button
        component="a"
        href={href}
        target={target}
        rel="noreferrer noopener"
        variant={getButtonVariant(importance)}
        disabled={disabled}
        loading={loading}
        color={buttonColor}
        w={width}
        fullWidth={fullWidth}
        size={size}
        leftSection={leftSection}
      >
        {children}
      </Button>
    ) : (
      <Link href={href} target={target}>
        <Button
          component="div"
          variant={getButtonVariant(importance)}
          disabled={disabled}
          loading={loading}
          color={buttonColor}
          w={width}
          fullWidth={fullWidth}
          size={size}
          leftSection={leftSection}
        >
          {children}
        </Button>
      </Link>
    )
  }

  // hrefがなければbuttonとして動作する
  return (
    <Button
      onClick={onClick}
      variant={getButtonVariant(importance)}
      disabled={disabled}
      loading={loading}
      type={type}
      color={buttonColor}
      w={width}
      fullWidth={fullWidth}
      size={size}
      leftSection={leftSection}
    >
      {children}
    </Button>
  )
}
