import type { FieldValue } from 'firebase/firestore'

import type { Uid } from '.'

export const userCollection = 'users' as const

export type User = {
  userId: Uid
  createdAt: Date
  email: string
  name: string | null
  updatedAt: Date
}

export type CreateUserDto = Omit<User, 'userId' | 'createdAt' | 'updatedAt'> & {
  createdAt: FieldValue
  name: null
  updatedAt: FieldValue
}
