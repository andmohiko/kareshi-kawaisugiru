import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  getFirestore,
  serverTimestamp as getServerTimestamp,
} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const firebaseApp = initializeApp({ ...config })
export const auth = getAuth(firebaseApp)
auth.languageCode = 'ja'

export const db = getFirestore()
export const serverTimestamp = getServerTimestamp()
export const storage = getStorage()
// window オブジェクトがあるときだけ getAnalytics() を呼び出す
export const analytics = typeof window !== 'undefined' ? getAnalytics() : null
