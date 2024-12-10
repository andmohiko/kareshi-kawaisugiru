import { BasicButton } from '~/components/Buttons/BasicButton'
import styles from './style.module.css'
import { BaseLayout } from '~/components/Layouts/BaseLayout'
import Image from 'next/image'

export const TopContainer = (): React.ReactNode => {
  return (
    <BaseLayout>
      <div className={styles.container}>
        <Image
          src="/images/logo-black.webp"
          width={329}
          height={191}
          alt="彼氏がかわいすぎる.com"
          className={styles.logo}
        />
        <div className={styles.action}>
          <BasicButton href="/i/mypage">彼氏のページを作る</BasicButton>
        </div>
      </div>
    </BaseLayout>
  )
}
