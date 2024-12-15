import axios from 'axios'

export const fetchImageBuffer = async (url: string): Promise<Buffer> => {
  const response = await axios.get(url, { responseType: 'arraybuffer' })
  return Buffer.from(response.data, 'binary')
}
