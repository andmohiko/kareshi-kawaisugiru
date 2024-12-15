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

const logoUrl = process.env.LOGO_URL!

export const generateOgpImage = async (
  imagePath: string,
  name: string,
  uploadPath: string,
): Promise<string> => {
  const thumbnailBuffer = await fetchImageBuffer(imagePath)
  const logoBuffer = await fetchImageBuffer(logoUrl)

  const resizedThumbnail = await sharp(thumbnailBuffer)
    .resize(canvasWidth, canvasHeight)
    .toBuffer()
  const resizedLogo = await sharp(logoBuffer).resize(240, 140).toBuffer()

  const canvas = createCanvas(canvasWidth, canvasHeight)
  const ctx = canvas.getContext('2d')

  // グラデーションのレイヤーを引く
  const gradientHeight = 193 // 高さを指定
  const gradientWidth = canvasWidth // 幅を指定
  const gradientTopPosition = canvasHeight - gradientHeight // キャンバスの下部に配置
  // グラデーションを作成
  const gradient = ctx.createLinearGradient(
    0,
    gradientTopPosition,
    0,
    canvasHeight,
  )
  gradient.addColorStop(0, 'rgba(34, 34, 34, 0)') // 開始色
  gradient.addColorStop(1, '#222222') // 終了色

  // 塗りつぶしスタイルをグラデーションに設定
  ctx.fillStyle = gradient

  // グラデーションを描画
  ctx.fillRect(
    (canvasWidth - gradientWidth) / 2,
    gradientTopPosition,
    gradientWidth,
    gradientHeight,
  )

  // 彼氏名を描画
  drawCanvasText(
    ctx,
    60,
    'Hiragino Maru Gothic ProN',
    '#ffffff',
    name,
    22,
    568,
    'left',
    'middle',
    'bold',
  )

  const textImageBuffer = canvas.toBuffer('image/png')

  const outputBuffer = await sharp(resizedThumbnail)
    .composite([
      { input: textImageBuffer, top: 0, left: 0 },
      { input: resizedLogo, top: 458, left: 928 },
    ])
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
