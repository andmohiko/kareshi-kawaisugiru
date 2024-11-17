import { doc, setDoc } from 'firebase/firestore'
import { Uid } from '~/entities'
import { CreateUserDto, userCollection } from '~/entities/User'
import { db } from '~/lib/firebase'

export const createUserOperation = async (uid: Uid, dto: CreateUserDto) => {
  await setDoc(doc(db, userCollection, uid), dto)
}
