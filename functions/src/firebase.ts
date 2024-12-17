import * as admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
})

const bucketId = process.env.BUCKET_ID!

export const auth = admin.auth()

export const db = admin.firestore()
export const serverTimestamp = admin.firestore.FieldValue.serverTimestamp()

export const storageBucket = admin.storage().bucket(`gs://${bucketId}`)
