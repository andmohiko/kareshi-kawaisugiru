import { useState, useCallback } from 'react'

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { v4 as uuid } from 'uuid'

import type { FileWithPath } from 'react-dropzone'

import { storage } from '~/lib/firebase'

export const useFileInput = (
  path: string,
  defaultValue = '',
): [string, (files: FileWithPath[]) => Promise<string>, boolean] => {
  const [fileURL, setFileURL] = useState<string>(defaultValue)
  const [loading, setLoading] = useState<boolean>(false)

  const onChange = useCallback(
    async (files: FileWithPath[]): Promise<string> => {
      setLoading(true)
      if (!files || files.length === 0) {
        return ''
      }

      const file = files[0]
      const filename = uuid()
      try {
        const fileURL = await uploadImage(`${path}/${filename}`, file)
        setFileURL(fileURL)
        setLoading(false)
        return fileURL
      } catch {
        console.log('error upload file')
      }
      setLoading(false)
      return ''
    },
    [path, setFileURL],
  )

  return [fileURL, onChange, loading]
}

const uploadImage = async (path: string, blob: Blob): Promise<string> => {
  const imageRef = ref(storage, path)
  const snapShot = await uploadBytesResumable(imageRef, blob)
  return getDownloadURL(snapShot.ref)
}
