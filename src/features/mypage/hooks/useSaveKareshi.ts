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
      landscapeImageUrl: data.landscapeImageUrl ?? null,
      name: data.name,
      portraitImageUrl: data.portraitImageUrl ?? null,
      squareImageUrl: data.squareImageUrl ?? null,
      updatedAt: serverTimestamp,
    })
  }

  return { createKareshi }
}
