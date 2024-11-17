import {
  dateColumns,
  Kareshi,
  kareshiCollection,
  KareshiId,
} from '~/entities/Kareshi'
import { db } from '~/lib/admin'
import { convertDate } from '~/utils/convertDate'

export const fetchKareshiByIdOperation = async (
  kareshiId: KareshiId,
): Promise<Kareshi> => {
  const snapshot = await db.collection(kareshiCollection).doc(kareshiId).get()
  const data = snapshot.data()
  if (!data) {
    throw new Error(`Kareshi ${kareshiId} not found`)
  }
  return {
    kareshiId: snapshot.id,
    ...convertDate(data, dateColumns),
  } as Kareshi
}
