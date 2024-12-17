import { type ReactElement, type ReactNode } from 'react'
import styles from './style.module.css'

type Props = {
  children?: ReactNode
}

export const BaseLayout = ({ children }: Props): ReactElement => {
  return (
    <div className={styles.base}>
      <div className={styles.pageLayout}>{children}</div>
    </div>
  )
}
