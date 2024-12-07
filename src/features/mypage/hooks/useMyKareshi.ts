import { subscribeKareshiByIdOperation } from '~/infrastructures/firestore/KareshiOperations'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import { Kareshi } from '~/entities/Kareshi'
import { useEffect, useState } from 'react'

export const useMyKareshi = (): {
  kareshi: Kareshi | null
  isLoading: boolean
} => {
  const [kareshi, setKareshi] = useState<Kareshi | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { uid } = useFirebaseAuthContext()

  useEffect(() => {
    if (!uid) {
      return
    }
    const unsubscribe = subscribeKareshiByIdOperation(
      uid,
      setKareshi,
      setIsLoading,
    )
    return () => unsubscribe()
  }, [uid])

  return { kareshi, isLoading }
}
