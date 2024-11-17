import { fetchKareshiByIdOperation } from '~/infrastructures/firestore/KareshiOperations'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import { Kareshi } from '~/entities/Kareshi'
import { useEffect, useState } from 'react'

export const useMyKareshi = (): {
  kareshi: Kareshi | null
  isLoading: boolean
} => {
  const [kareshi, setKareshi] = useState<Kareshi | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { uid } = useFirebaseAuthContext()

  useEffect(() => {
    const func = async () => {
      if (!uid) {
        return
      }
      setIsLoading(true)
      const data = await fetchKareshiByIdOperation(uid)
      setKareshi(data)
      setIsLoading(false)
    }
    func()
  }, [uid])

  return { kareshi, isLoading }
}
