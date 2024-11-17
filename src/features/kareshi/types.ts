import { z } from 'zod'

export const editKareshiSchema = z.object({
  landscapeImageUrl: z.string().nullable(),
  name: z.string().nullable(),
  portraitImageUrl: z.string().nullable(),
  squareImageUrl: z.string().nullable(),
})

export type EditKareshiInputType = z.infer<typeof editKareshiSchema>
