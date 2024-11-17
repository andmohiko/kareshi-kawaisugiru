import { doc, setDoc } from 'firebase/firestore'
import {
  CreateKareshiDto,
  kareshiCollection,
  KareshiId,
} from '~/entities/Kareshi'
import { db } from '~/lib/firebase'

export const createKareshiOperation = async (
  kareshiId: KareshiId,
  dto: CreateKareshiDto,
) => {
  await setDoc(doc(db, kareshiCollection, kareshiId), dto)
}
