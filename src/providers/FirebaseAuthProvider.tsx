import type { User } from 'firebase/auth'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

import { auth } from '~/lib/firebase'

const authPaths = ['/', '/i/mypage', '/i/signup', '/i/login']

const FirebaseAuthContext = createContext<{
  uid: string | null
  currentUser: User | null
  logout: () => void
}>({
  uid: null,
  currentUser: null,
  logout: () => {},
})

export const FirebaseAuthProvider = ({ children }: { children: ReactNode }) => {
  const { pathname, push } = useRouter()
  const [uid, setUid] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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

  return (
    <FirebaseAuthContext.Provider value={{ uid, currentUser, logout }}>
      {children}
    </FirebaseAuthContext.Provider>
  )
}

export const useFirebaseAuthContext = () => useContext(FirebaseAuthContext)
