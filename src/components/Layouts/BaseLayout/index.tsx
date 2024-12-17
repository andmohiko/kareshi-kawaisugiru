import { type ReactElement, type ReactNode, Suspense } from 'react'
import { Loading } from '~/components/Base/Loading'
import { LoadingOverlay } from '~/components/Base/LoadingOverlay'
import styles from './style.module.css'

type Props = {
  children?: ReactNode
}

export const BaseLayout = ({ children }: Props): ReactElement => {
  return (
    <div className={styles.base}>
      <div className={styles.pageLayout}>
        <Suspense fallback={<LoadingOverlay />}>
          <Loading />
          {children}
        </Suspense>
      </div>
    </div>
  )
}
