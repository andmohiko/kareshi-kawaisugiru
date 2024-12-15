import { z } from 'zod'
import { isExistKareshiByUsernameOperation } from '~/infrastructures/firestore/KareshiOperations'

const kareshiSchema = z.object({
  kareshiName: z
    .string()
    .max(8, { message: '8文字以内にしてください' })
    .nullable(),
  landscapeImageUrl: z.string().optional(),
  portraitImageUrl: z.string().optional(),
  squareImageUrl: z.string().optional(),
  username: z
    .string()
    .min(4, { message: '4文字以上にしてください' })
    .max(30, { message: '30文字以内にしてください' })
    .nullable(),
})

export const editKareshiSchema = (currentUsername: string | null) => {
  // usernameが未入力のときは通常のバリデーションを返す
  if (!currentUsername) {
    return kareshiSchema
  }
  // usernameが入力済みのときはusernameの重複チェックを追加する
  return kareshiSchema.refine(
    async (data) => {
      if (!data || !data.username || data.username === currentUsername) {
        return true
      }
      const isExistUsername = await isExistKareshiByUsernameOperation(
        data.username,
      )
      return !isExistUsername
    },
    // エラーメッセージはusernameのバリデーションに表示する
    {
      path: ['username'],
      message: 'このIDはすでに使われています',
    },
  )
}

export type EditKareshiInputType = z.infer<ReturnType<typeof editKareshiSchema>>
