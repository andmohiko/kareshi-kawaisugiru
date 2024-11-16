import { Timestamp } from '@firebase/firestore'

export const convertDate = (timestamp: Timestamp): Date => {
  if (!timestamp) {
    return new Date(0)
  }
  return new Date(timestamp.seconds * 1000)
}

// /**
//  * firebaseのtimestamp型をDate型に変換する
//  * @param snapshot
//  * @param targetKey
//  */
//  export function convertDate(
//   snapshot: DocumentData,
//   targetKey: string[]
// ): DocumentData {
//   targetKey.forEach(key => {
//     const value: Timestamp = snapshot[key]
//     if (value) {
//       snapshot[key] = value.toDate()
//     }
//   })
//   return snapshot
// }
