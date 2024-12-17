import axios, { isAxiosError } from 'axios'
import type { User } from 'firebase/auth'

export const axiosBase = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT_URL,
})

/**
 * userTokenをセットする
 * @param token
 */
export const setBearer = async (currentUser: User) => {
  const token = await currentUser.getIdToken()
  axiosBase.defaults.headers.authorization = `Bearer ${token}`
}

const post = async <T>(
  currentUser: User,
  url: string,
  data = {},
  config = {},
): Promise<T> => {
  try {
    await setBearer(currentUser)
    const axiosResponse = await axiosBase.post<T>(url, data, config)
    return axiosResponse.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message)
    } else {
      throw error
    }
  }
}

const get = async <T>(
  currentUser: User,
  url: string,
  data = {},
): Promise<T> => {
  try {
    await setBearer(currentUser)
    const axiosResponse = await axiosBase.get<T>(url, data)
    return axiosResponse.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message)
    } else {
      throw error
    }
  }
}

export default { post, get }
