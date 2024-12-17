import { storageBucket } from '../firebase'

export const saveFileToStorageOperation = async (
  file: {
    fileName: string
    type: string
    data: string // base64のデータ
  },
  storagePath: string,
): Promise<string> => {
  // 引数で渡ってきたfileをbase64からBufferに変換してstorageに保存する
  const buffer = Buffer.from(file.data, 'base64')
  const fileRef = storageBucket.file(`${storagePath}/${file.fileName}`)
  await fileRef.save(buffer, {
    contentType: file.type,
  })
  return `https://storage.googleapis.com/${storageBucket.name}/${storagePath}/${file.fileName}`
}

export const saveBufferToStorageOperation = async (
  file: {
    fileName: string
    type: string
    data: Buffer
  },
  storagePath: string,
): Promise<string> => {
  const fileRef = storageBucket.file(`${storagePath}/${file.fileName}`)
  await fileRef.save(file.data, {
    contentType: file.type,
  })
  await fileRef.makePublic()
  return fileRef.publicUrl()
}
