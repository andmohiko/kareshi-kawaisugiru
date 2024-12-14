import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  setDoc,
  Unsubscribe,
  where,
} from 'firebase/firestore'
import {
  CreateKareshiDto,
  dateColumns,
  Kareshi,
  kareshiCollection,
  KareshiId,
} from '~/entities/Kareshi'
import { db } from '~/lib/firebase'
import { convertDate } from '~/utils/convertDate'

export const subscribeKareshiByIdOperation = (
  kareshiId: KareshiId,
  setState: (kareshi: Kareshi | null) => void,
  setIsLoading: (isLoading: boolean) => void,
): Unsubscribe => {
  const unsubscribe = onSnapshot(
    doc(db, kareshiCollection, kareshiId),
    (snapshot) => {
      setIsLoading(true)
      const data = snapshot.data()
      if (!snapshot.exists() || !data) {
        setIsLoading(false)
        return null
      }
      const kareshi = {
        kareshiId: snapshot.id,
        ...convertDate(data, dateColumns),
      } as Kareshi
      setState(kareshi)
      setIsLoading(false)
    },
  )
  return unsubscribe
}

export const createKareshiOperation = async (
  kareshiId: KareshiId,
  dto: CreateKareshiDto,
) => {
  await setDoc(doc(db, kareshiCollection, kareshiId), dto)
}

export const isExistKareshiByUsernameOperation = async (
  username: string,
): Promise<boolean> => {
  const snapshot = await getDocs(
    query(
      collection(db, kareshiCollection),
      where('username', '==', username),
      limit(1),
    ),
  )
  return snapshot.size > 0
}
