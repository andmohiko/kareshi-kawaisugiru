import {
  dateColumns,
  Kareshi,
  kareshiCollection,
  KareshiId,
} from '~/entities/Kareshi'
import { db } from '~/lib/admin'
import { convertDate } from '~/utils/convertDate'

export const fetchKareshiByUsernameOperation = async (
  username: string,
): Promise<Kareshi> => {
  const snapshot = await db
    .collection(kareshiCollection)
    .where('username', '==', username)
    .limit(1)
    .get()
  const docSnapshot = snapshot.docs[0]
  const data = docSnapshot.data()
  if (!data) {
    throw new Error(`Kareshi ${username} not found`)
  }
  return {
    kareshiId: docSnapshot.id,
    ...convertDate(data, dateColumns),
  } as Kareshi
}
