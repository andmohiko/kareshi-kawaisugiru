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
): Promise<Kareshi> => {
  const snapshot = await getDoc(doc(db, kareshiCollection, kareshiId))
  const data = snapshot.data()
  if (!snapshot.exists() || !data) {
    throw new Error(`Kareshi ${kareshiId} not found`)
  }
  return {
    kareshiId: snapshot.id,
    ...convertDate(snapshot.data(), dateColumns),
  } as Kareshi
}

export const createKareshiOperation = async (
  kareshiId: KareshiId,
  dto: CreateKareshiDto,
) => {
  await setDoc(doc(db, kareshiCollection, kareshiId), dto)
}
