import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'

import { auth } from '~/lib/firebase'

type Params = {
  email: string
  password: string
}

export const useLogin = (): {
  login: (params: Params) => Promise<void>
} => {
  const { push } = useRouter()

  const login = async ({ email, password }: Params) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => push('/mypage'))
      .catch((error) => {
        throw new Error(error)
      })
  }

  return { login }
}
