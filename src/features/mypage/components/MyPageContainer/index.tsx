import { BasicButton } from '~/components/Buttons/BasicButton'
import styles from './style.module.css'
import { BaseLayout } from '~/components/Layouts/BaseLayout'
import { TitleText } from '~/components/Typography/TitleText'
import { EditKareshiForm } from '~/features/mypage/components/EditKareshiForm'
import { useMyKareshi } from '~/features/mypage/hooks/useMyKareshi'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import { ShareButton } from '~/components/Buttons/ShareButton'
import { CopyButton } from '~/components/Buttons/CopyButton'

export const MyPageContainer = (): React.ReactNode => {
  const { kareshi, isLoading } = useMyKareshi()
  const { logout } = useFirebaseAuthContext()
  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${kareshi?.username}`
  return (
    <BaseLayout>
      <div className={styles.container}>
        <TitleText>うちの彼氏</TitleText>
        {!isLoading ? <EditKareshiForm kareshi={kareshi} /> : null}
      </div>
      <div className={styles.actions}>
        {kareshi?.username && kareshi?.landscapeImageUrl && (
          <>
            <BasicButton
              href={`/${kareshi.username}`}
              importance="secondary"
              disabled={!kareshi?.username}
            >
              彼氏のページを開く
            </BasicButton>
            <ShareButton shareUrl={shareUrl} width="175px">
              ポストで共有
            </ShareButton>
            <CopyButton
              copyText={shareUrl}
              width="175px"
              importance="secondary"
            >
              リンクをコピー
            </CopyButton>
          </>
        )}
        <BasicButton importance="tertiary" onClick={logout}>
          ログアウト
        </BasicButton>
      </div>
    </BaseLayout>
  )
}
