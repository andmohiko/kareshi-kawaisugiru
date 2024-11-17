import { z } from 'zod'

export const editKareshiSchema = z.object({
  kareshiName: z.string().nullable(),
  landscapeImageUrl: z.string().optional(),
  portraitImageUrl: z.string().optional(),
  squareImageUrl: z.string().optional(),
  username: z.string().nullable(),
})

export type EditKareshiInputType = z.infer<typeof editKareshiSchema>
