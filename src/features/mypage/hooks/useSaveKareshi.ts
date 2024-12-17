import { createKareshiOperation } from '~/infrastructures/firestore/KareshiOperations'
import { serverTimestamp } from '~/lib/firebase'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import { EditKareshiInputType } from '~/features/mypage/types'
import { fetchOgpImageUrlOperation } from '~/infrastructures/api/fetchOgpImageUrlOperation'

export const useSaveKareshi = (): {
  createKareshi: (data: EditKareshiInputType) => void
} => {
  const { uid, currentUser } = useFirebaseAuthContext()

  const createKareshi = async (data: EditKareshiInputType) => {
    if (!uid || !currentUser) {
      throw new Error('再度ログインしてください')
    }

    let ogpImageUrl = ''
    try {
      ogpImageUrl = await fetchOgpImageUrlOperation(
        currentUser,
        data.landscapeImageUrl,
        data.kareshiName,
        uid,
      )
    } catch (e) {
      throw new Error('彼氏画像の作成に失敗しました')
    }

    await createKareshiOperation(uid, {
      createdAt: serverTimestamp,
      kareshiName: data.kareshiName,
      landscapeImageUrl: data.landscapeImageUrl ? data.landscapeImageUrl : null,
      ogpImageUrl,
      portraitImageUrl: data.portraitImageUrl ? data.portraitImageUrl : null,
      squareImageUrl: data.squareImageUrl ? data.squareImageUrl : null,
      updatedAt: serverTimestamp,
      username: data.username,
    })
  }

  return { createKareshi }
}
