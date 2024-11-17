import styles from './style.module.css'
import { BaseLayout } from '~/components/Layouts/BaseLayout'
import { TitleText } from '~/components/Typography/TitleText'
import { EditKareshiForm } from '~/features/kareshi/components/EditKareshiForm'
import { useMyKareshi } from '~/features/kareshi/hooks/useMyKareshi'

export const KareshiContainer = (): React.ReactNode => {
  const { kareshi, isLoading } = useMyKareshi()
  return (
    <BaseLayout>
      <div className={styles.container}>
        <TitleText>うちの彼氏</TitleText>
        {!isLoading ? <EditKareshiForm kareshi={kareshi} /> : null}
      </div>
    </BaseLayout>
  )
}
