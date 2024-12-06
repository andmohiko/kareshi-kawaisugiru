import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '~/entities/User'
import { fetchUserByIdOperation } from '~/infrastructures/firestore/UserOperations'

import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'

const authPaths = ['/', '/i/mypage', '/i/signup', '/i/login']

const UserContext = createContext<{
  isRegistered: boolean
}>({
  isRegistered: false,
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { pathname, push } = useRouter()
  const [isRegistered, setIsRegistered] = useState<boolean>(false)
  const { uid } = useFirebaseAuthContext()
  const [user, setUser] = useState<User | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    // ログイン不要なページではなにもしない
    if (!authPaths.includes(pathname)) {
      return
    }

    // 未ログインならログインページにリダイレクト
    if (!uid) {
      push('/i/login')
      return
    }

    const func = async () => {
      const user = await fetchUserByIdOperation(uid)
      if (!user) {
        setIsRegistered(false)
        push('/i/signup')
        return
      }

      setIsRegistered(true)
      setUser(user)
    }
    func()
  }, [pathname, push])

  return (
    <UserContext.Provider value={{ isRegistered }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
