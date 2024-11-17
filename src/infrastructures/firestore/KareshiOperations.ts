import { doc, getDoc, setDoc } from 'firebase/firestore'
import {
  CreateKareshiDto,
  dateColumns,
  Kareshi,
  kareshiCollection,
  KareshiId,
} from '~/entities/Kareshi'
import { db } from '~/lib/firebase'
import { convertDate } from '~/utils/convertDate'

export const fetchKareshiByIdOperation = async (
  kareshiId: KareshiId,
): Promise<Kareshi | null> => {
  const snapshot = await getDoc(doc(db, kareshiCollection, kareshiId))
  const data = snapshot.data()
  if (!snapshot.exists() || !data) {
    return null
  }
  return {
    kareshiId: snapshot.id,
    ...convertDate(data, dateColumns),
  } as Kareshi
}

export const createKareshiOperation = async (
  kareshiId: KareshiId,
  dto: CreateKareshiDto,
) => {
  await setDoc(doc(db, kareshiCollection, kareshiId), dto)
}
