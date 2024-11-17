import Link from 'next/link'
import { FiLink, FiExternalLink } from 'react-icons/fi'

import styles from './style.module.css'

type Size = 'sm' | 'md' | 'lg'

const getFontSize = (size: Size): number => {
  if (size === 'sm') {
    return 13
  }
  if (size === 'lg') {
    return 18
  }
  return 15
}

// eslint-disable-next-line no-useless-escape
const urlPattern = /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/

export const isExternalLink = (href: string): boolean => {
  return urlPattern.test(href)
}

type Props = {
  href: string
  label: string
  target?: '_self' | '_blank'
  size?: Size
  withIcon?: boolean
}

export const LinkItem = ({
  href,
  label,
  target = '_self',
  size = 'md',
  withIcon = false,
}: Props): React.ReactNode => {
  return isExternalLink(href) ? (
    <a
      href={href}
      target={target}
      className={styles.linkItem}
      style={{
        fontSize: getFontSize(size),
      }}
    >
      {label}
      {withIcon && <FiExternalLink />}
    </a>
  ) : (
    <Link
      href={href}
      target={target}
      className={styles.linkItem}
      style={{
        fontSize: getFontSize(size),
      }}
    >
      {withIcon && <FiLink />}
      {label}
    </Link>
  )
}
