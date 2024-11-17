import { z } from 'zod'

export const editKareshiSchema = z.object({
  landscapeImageUrl: z.string().optional(),
  name: z.string().nullable(),
  portraitImageUrl: z.string().optional(),
  squareImageUrl: z.string().optional(),
})

export type EditKareshiInputType = z.infer<typeof editKareshiSchema>
