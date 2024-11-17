import { createKareshiOperation } from '~/infrastructures/firestore/KareshiOperations'
import { serverTimestamp } from '~/lib/firebase'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'

type Params = {
  landscapeImageUrl: string | null
  name: string | null
  portraitImageUrl: string | null
  squareImageUrl: string | null
}

export const useSaveKareshi = (): {
  createKareshi: (params: Params) => void
} => {
  const { uid } = useFirebaseAuthContext()

  const createKareshi = async (params: Params) => {
    if (!uid) {
      throw new Error('再度ログインしてください')
    }

    await createKareshiOperation(uid, {
      createdAt: serverTimestamp,
      landscapeImageUrl: params.landscapeImageUrl,
      name: params.name,
      portraitImageUrl: params.portraitImageUrl,
      squareImageUrl: params.squareImageUrl,
      updatedAt: serverTimestamp,
    })
  }

  return { createKareshi }
}
