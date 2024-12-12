import type { FieldValue } from 'firebase-admin/firestore'

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
  kareshiName: string | null
  landscapeImageUrl: string | null
  ogpImageUrl: string | null
  portraitImageUrl: string | null
  squareImageUrl: string | null
  updatedAt: Date
  username: string | null
}

export type UpdateKareshiDto = {
  ogpImageUrl?: Kareshi['ogpImageUrl']
  updatedAt: FieldValue
}
