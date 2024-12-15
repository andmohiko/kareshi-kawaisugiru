import { DocumentSnapshot } from 'firebase-admin/firestore'
import {
  Kareshi,
  kareshiCollection,
  KareshiId,
  UpdateKareshiDto,
} from '../entities/Kareshi'
import { db } from '../firebase'

export const convertKareshiFromSnapshotOperation = (
  kareshiId: KareshiId,
  snapshot: DocumentSnapshot,
): Kareshi => {
  return {
    kareshiId,
    ...snapshot.data(),
  } as Kareshi
}

export const updateKareshiOperation = async (
  kareshiId: KareshiId,
  dto: UpdateKareshiDto,
): Promise<void> => {
  await db.collection(kareshiCollection).doc(kareshiId).update(dto)
}
