import { useRouter } from 'next/router'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { auth, serverTimestamp } from '~/lib/firebase'
import { useToast } from '~/hooks/useToast'
import { errorMessage } from '~/utils/errorMessage'
import { createUserOperation } from '~/infrastructures/firestore/UserOperations'

type Params = {
  email: string
  password: string
}

export const useSignUp = (): {
  signUp: (params: Params) => Promise<void>
} => {
  const { push } = useRouter()
  const { showErrorToast } = useToast()

  const signUp = async ({ email, password }: Params) => {
    // Firebase Authのユーザー作成
    const user = await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => userCredential.user)
      .catch((e) => {
        showErrorToast(errorMessage(e))
      })
    if (!user) {
      throw new Error('認証に失敗しました')
    }

    const { uid } = user

    // Firestoreにドキュメント作成
    await createUserOperation(uid, {
      createdAt: serverTimestamp,
      email,
      name: null,
      updatedAt: serverTimestamp,
    })

    push('/i/mypage')
  }

  return {
    signUp,
  }
}
