import { BasicButton } from '~/components/Buttons/BasicButton'
import styles from './style.module.css'
import { BaseLayout } from '~/components/Layouts/BaseLayout'
import { TitleText } from '~/components/Typography/TitleText'
import { EditKareshiForm } from '~/features/mypage/components/EditKareshiForm'
import { useMyKareshi } from '~/features/mypage/hooks/useMyKareshi'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'

export const MyPageContainer = (): React.ReactNode => {
  const { kareshi, isLoading } = useMyKareshi()
  const { logout } = useFirebaseAuthContext()
  return (
    <BaseLayout>
      <div className={styles.container}>
        <TitleText>うちの彼氏</TitleText>
        {!isLoading ? <EditKareshiForm kareshi={kareshi} /> : null}
      </div>
      <div className={styles.actions}>
        <BasicButton href={`/${kareshi?.username}`} importance="secondary">
          彼氏のページを開く
        </BasicButton>
        <BasicButton importance="tertiary" onClick={logout}>
          ログアウト
        </BasicButton>
      </div>
    </BaseLayout>
  )
}
