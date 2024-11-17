import { BasicButton } from '~/components/Buttons/BasicButton'
import styles from './style.module.css'

export const TopContainer = (): React.ReactNode => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>彼氏がかわいすぎる</h1>
      <div className={styles.action}>
        <BasicButton href="/mypage">彼氏のページを作る</BasicButton>
      </div>
    </div>
  )
}
