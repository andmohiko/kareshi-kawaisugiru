import { BasicButton } from '~/components/Buttons/BasicButton'
import styles from './style.module.css'
import { BaseLayout } from '~/components/Layouts/BaseLayout'

export const TopContainer = (): React.ReactNode => {
  return (
    <BaseLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>彼氏がかわいすぎる</h1>
        <div className={styles.action}>
          <BasicButton href="/mypage">彼氏のページを作る</BasicButton>
        </div>
      </div>
    </BaseLayout>
  )
}
