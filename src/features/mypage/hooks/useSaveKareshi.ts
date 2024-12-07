import { createKareshiOperation } from '~/infrastructures/firestore/KareshiOperations'
import { serverTimestamp } from '~/lib/firebase'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import { EditKareshiInputType } from '~/features/mypage/types'

export const useSaveKareshi = (): {
  createKareshi: (data: EditKareshiInputType) => void
} => {
  const { uid } = useFirebaseAuthContext()

  const createKareshi = async (data: EditKareshiInputType) => {
    if (!uid) {
      throw new Error('再度ログインしてください')
    }

    await createKareshiOperation(uid, {
      createdAt: serverTimestamp,
      kareshiName: data.kareshiName,
      landscapeImageUrl: data.landscapeImageUrl ? data.landscapeImageUrl : null,
      portraitImageUrl: data.portraitImageUrl ? data.portraitImageUrl : null,
      squareImageUrl: data.squareImageUrl ? data.squareImageUrl : null,
      updatedAt: serverTimestamp,
      username: data.username,
    })
  }

  return { createKareshi }
}
