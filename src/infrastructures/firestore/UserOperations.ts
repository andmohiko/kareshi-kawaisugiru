import { doc, getDoc, setDoc } from 'firebase/firestore'
import { Uid } from '~/entities'
import {
  CreateUserDto,
  dateColumns,
  User,
  userCollection,
} from '~/entities/User'
import { db } from '~/lib/firebase'
import { convertDate } from '~/utils/convertDate'

export const fetchUserByIdOperation = async (
  uid: Uid,
): Promise<User | null> => {
  const snapshot = await getDoc(doc(db, userCollection, uid))
  const data = snapshot.data()
  if (!data) {
    return null
  }
  return {
    userId: snapshot.id,
    ...convertDate(data, dateColumns),
  } as User
}

export const createUserOperation = async (uid: Uid, dto: CreateUserDto) => {
  await setDoc(doc(db, userCollection, uid), dto)
}
