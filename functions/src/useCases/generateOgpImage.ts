import { createCanvas } from '@napi-rs/canvas'
import sharp from 'sharp'
import { v4 as uuidV4 } from 'uuid'

import { fetchImageBuffer } from '../infrastructure/FetchImageBufferFromUrl'
import {
  // saveFileToStorageOperation,
  saveBufferToStorageOperation,
} from '../infrastructure/StorageOperation'
import { drawCanvasText } from '../utils/canvasText'

const canvasWidth = 1200
const canvasHeight = 630

export const generateOgpImage = async (
  imagePath: string,
  name: string,
  uploadPath: string,
): Promise<string> => {
  const thumbnailBuffer = await fetchImageBuffer(imagePath)
  const resizedThumbnail = await sharp(thumbnailBuffer)
    .resize(canvasWidth, canvasHeight)
    .toBuffer()

  const canvas = createCanvas(canvasWidth, canvasHeight)
  const ctx = canvas.getContext('2d')

  drawCanvasText(
    ctx,
    60,
    'Hiragino Maru Gothic ProN',
    '#ffffff',
    name,
    32,
    568,
    'left',
    'middle',
    'bold',
  )

  const textImageBuffer = canvas.toBuffer('image/png')

  const outputBuffer = await sharp(resizedThumbnail)
    .composite([{ input: textImageBuffer, top: 0, left: 0 }])
    .toBuffer()

  const fileUrl = await saveBufferToStorageOperation(
    {
      fileName: `${uuidV4()}.png`,
      type: 'image/png',
      data: outputBuffer,
    },
    uploadPath,
  )
  return fileUrl
}
