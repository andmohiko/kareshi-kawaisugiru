import type { FieldValue } from 'firebase/firestore'

import type { Uid } from '.'

export const kareshiCollection = 'kareshis' as const

export const dateColumns = [
  'createdAt',
  'updatedAt',
] as const satisfies Array<string>

export type KareshiId = Uid

export type Kareshi = {
  kareshiId: KareshiId
  createdAt: Date
  landscapeImageUrl: string | null
  name: string | null
  portraitImageUrl: string | null
  squareImageUrl: string | null
  updatedAt: Date
}

export type CreateKareshiDto = Omit<
  Kareshi,
  'kareshiId' | 'createdAt' | 'updatedAt'
> & {
  createdAt: FieldValue
  updatedAt: FieldValue
}
