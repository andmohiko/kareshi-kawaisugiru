import { Kareshi } from '~/entities/Kareshi'
import type { User as AuthUser } from 'firebase/auth'
import { User } from '~/entities/User'

import { axiosBase, setBearer } from '~/lib/axios'

export const fetchOgpImageUrlOperation = async (
  currentUser: AuthUser,
  imagePath: Kareshi['landscapeImageUrl'],
  kareshiName: Kareshi['kareshiName'],
  userId: User['userId'],
): Promise<string> => {
  try {
    await setBearer(currentUser)
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
    throw new Error('彼氏画像の作成に失敗しました')
  }
}
