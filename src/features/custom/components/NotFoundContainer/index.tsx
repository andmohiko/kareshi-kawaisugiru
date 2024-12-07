import { BasicButton } from '~/components/Buttons/BasicButton'
import styles from './style.module.css'
import { BaseLayout } from '~/components/Layouts/BaseLayout'

export const NotFoundContainer = (): React.ReactNode => {
  return (
    <BaseLayout>
      <div className={styles.container}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>
          かわいすぎる彼氏が
          <br />
          見つかりませんでした
        </h1>
      </div>
    </BaseLayout>
  )
}
