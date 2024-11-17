import styles from './style.module.css'
import { BaseLayout } from '~/components/Layouts/BaseLayout'
import { TitleText } from '~/components/Typography/TitleText'
import { EditKareshiForm } from '~/features/kareshi/components/EditKareshiForm'

export const KareshiContainer = (): React.ReactNode => {
  return (
    <BaseLayout>
      <div className={styles.container}>
        <TitleText>うちの彼氏</TitleText>
        <EditKareshiForm />
      </div>
    </BaseLayout>
  )
}
