import { isAxiosError } from 'axios'
import { Kareshi } from '~/entities/Kareshi'
import { User } from '~/entities/User'

import { axiosBase } from '~/lib/axios'

export const fetchOgpImageUrlOperation = async (
  imagePath: Kareshi['landscapeImageUrl'],
  kareshiName: Kareshi['kareshiName'],
  userId: User['userId'],
): Promise<string> => {
  try {
    const response = await axiosBase.post<{ ogpImagePath: string }>(
      '/kareshis/ogpImage',
      {
        imagePath,
        kareshiName,
        userId,
      },
    )
    return response.data.ogpImagePath
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message)
    } else {
      throw error
    }
  }
}
