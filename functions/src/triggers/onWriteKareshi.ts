import * as functions from 'firebase-functions/v1'
import {
  convertKareshiFromSnapshotOperation,
  updateKareshiOperation,
} from '../infrastructure/KareshiOperations'
import { serverTimestamp } from '../firebase'
import { generateOgpImage } from '../useCases/generateOgpImage'

const onWriteKareshi = functions
  .region('asia-northeast1')
  .runWith({
    memory: '1GB' as const,
  })
  .firestore.document('kareshis/{kareshiId}')
  .onWrite(async (change, context) => {
    const kareshiId = context.params.kareshiId
    const beforeKareshi = convertKareshiFromSnapshotOperation(
      kareshiId,
      change.before,
    )
    const afterKareshi = convertKareshiFromSnapshotOperation(
      kareshiId,
      change.after,
    )
    try {
      // 画像が変更されたらOGP画像を更新する
      if (
        beforeKareshi.landscapeImageUrl !== afterKareshi.landscapeImageUrl ||
        beforeKareshi.portraitImageUrl !== afterKareshi.portraitImageUrl ||
        beforeKareshi.squareImageUrl !== afterKareshi.squareImageUrl
      ) {
        let targetImage = ''
        if (afterKareshi.landscapeImageUrl) {
          targetImage = afterKareshi.landscapeImageUrl
        } else if (afterKareshi.squareImageUrl) {
          targetImage = afterKareshi.squareImageUrl
        } else if (afterKareshi.portraitImageUrl) {
          targetImage = afterKareshi.portraitImageUrl
        }

        // もし画像がなかったらなにもしない
        if (!targetImage) {
          return
        }

        const uploadPath = `images/users/${kareshiId}`
        const ogpImageUrl = await generateOgpImage(
          targetImage,
          afterKareshi.kareshiName ?? '',
          uploadPath,
        )

        await updateKareshiOperation(kareshiId, {
          ogpImageUrl,
          updatedAt: serverTimestamp,
        })
      }
    } catch (e) {
      console.error('error', e)
    }
  })

export default onWriteKareshi
