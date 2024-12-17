import type { User } from 'firebase/auth'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { LoadingOverlay } from '~/components/Base/LoadingOverlay'

import { auth } from '~/lib/firebase'

const authPaths = ['/i/mypage']

const FirebaseAuthContext = createContext<{
  uid: string | null | undefined
  currentUser: User | null | undefined
  logout: () => void
}>({
  uid: undefined,
  currentUser: undefined,
  logout: () => {},
})

export const FirebaseAuthProvider = ({ children }: { children: ReactNode }) => {
  const { pathname, push } = useRouter()
  const [uid, setUid] = useState<string | null | undefined>(undefined)
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined,
  )

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUid(null)
      setCurrentUser(null)
      // ログイン不要なページではなにもしない
      if (!authPaths.includes(pathname)) {
        return
      }

      // ログインが必要なページでログインしていない場合はログインページにリダイレクト
      if (!user) {
        push('/i/login')
        return
      }
      setUid(user.uid)
      setCurrentUser(user)
    })
    return () => {
      unsubscribe()
    }
  }, [pathname, push])

  const logout = async () => {
    setCurrentUser(null)
    await signOut(auth)
    push('/')
  }

  // ログインが必要なページでだけuidの存在確認をする
  // if (uid === undefined) {
  //   return <LoadingOverlay />
  // }

  return (
    <FirebaseAuthContext.Provider value={{ uid, currentUser, logout }}>
      {children}
    </FirebaseAuthContext.Provider>
  )
}

export const useFirebaseAuthContext = () => useContext(FirebaseAuthContext)
