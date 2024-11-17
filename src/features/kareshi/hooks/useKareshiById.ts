import { fetchKareshiByIdOperation } from '~/infrastructures/firestore/KareshiOperations'
import { Kareshi } from '~/entities/Kareshi'
import { useEffect, useState } from 'react'

export const useKareshiById = (
  id: string,
): {
  kareshi: Kareshi | null
  isLoading: boolean
} => {
  const [kareshi, setKareshi] = useState<Kareshi | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const func = async () => {
      setIsLoading(true)
      const data = await fetchKareshiByIdOperation(id)
      setKareshi(data)
      setIsLoading(false)
    }
    func()
  }, [id])

  return { kareshi, isLoading }
}
