import { z } from 'zod'

export const editKareshiSchema = z.object({
  kareshiName: z.string().nullable(),
  landscapeImageUrl: z.string().optional(),
  portraitImageUrl: z.string().optional(),
  squareImageUrl: z.string().optional(),
  username: z
    .string()
    .min(4, { message: '4文字以上にしてください' })
    .max(30, { message: '30文字以内にしてください' })
    .nullable(),
})

export type EditKareshiInputType = z.infer<typeof editKareshiSchema>
