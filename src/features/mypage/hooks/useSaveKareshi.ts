import { createKareshiOperation } from '~/infrastructures/firestore/KareshiOperations'
import { serverTimestamp } from '~/lib/firebase'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import { EditKareshiInputType } from '~/features/mypage/types'
import { fetchOgpImageUrlOperation } from '~/infrastructures/api/fetchOgpImageUrlOperation'
import { useCallback } from 'react'

export const useSaveKareshi = (
  progress: number,
  setProgress: (progress: number) => void,
): {
  createKareshi: (data: EditKareshiInputType) => void
  progress: number
} => {
  const { uid, currentUser } = useFirebaseAuthContext()

  // 送信中の場合は 99% で止める
  const loadingProgress = useCallback(
    (progress: number) => {
      if (progress <= 99) {
        return progress
      }
      return 99
    },
    [progress],
  )

  const startLoadingAnimation = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 1
      setProgress(loadingProgress(progress))
      if (progress >= 100) {
        clearInterval(interval)
      }
    }, 50) // 最低でも5sはローディングを表示する
  }

  const createKareshi = async (data: EditKareshiInputType) => {
    if (!uid || !currentUser) {
      throw new Error('再度ログインしてください')
    }
    startLoadingAnimation()

    try {
      const ogpImageUrl = await fetchOgpImageUrlOperation(
        currentUser,
        data.landscapeImageUrl,
        data.kareshiName,
        uid,
      )

      await createKareshiOperation(uid, {
        createdAt: serverTimestamp,
        kareshiName: data.kareshiName,
        landscapeImageUrl: data.landscapeImageUrl
          ? data.landscapeImageUrl
          : null,
        ogpImageUrl,
        portraitImageUrl: data.portraitImageUrl ? data.portraitImageUrl : null,
        squareImageUrl: data.squareImageUrl ? data.squareImageUrl : null,
        updatedAt: serverTimestamp,
        username: data.username,
      })
    } catch (e) {
      throw new Error('彼氏ページの作成に失敗しました')
    }
  }

  return { createKareshi, progress }
}
