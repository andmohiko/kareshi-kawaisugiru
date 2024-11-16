import type { DocumentData } from 'firebase/firestore'

import { TagUI } from '~/entities'
// import { convertDate } from '../utils/date'

// const TagsCollection = 'tags'

// export const useFetchTags = (db: Firestore) => {
//   const fetchTags = () => {
//     const [tags, setTags] = useState<Tag[]>()
//     const [value, loading, error] = useCollection(
//       collection(db, TagsCollection),
//     )

//     useEffect(() => {
//       if (!value) return
//       const tags = value.docs
//         .map((doc) => {
//           return tagFactory(doc)
//         })
//         .filter(isDefined)
//       setTags(tags)
//     }, [value])
//     return tags
//   }
//   return fetchTags
// }

// export const useCreateTag = () => {
//   const createTag = async (dto: CreateTagDto) => {
//     const tagRef = await addDoc(collection(db, TagsCollection), dto)
//     return tagRef.id
//   }
//   return createTag
// }

export const tagFactory = (doc: DocumentData): TagUI | undefined => {
  const data = doc.data()
  if (!data) return

  return {
    tagID: doc.id,
    createdAt: data.createdAt,
    isActive: false,
    label: data.label,
    scenesCount: data.scenesCount,
    updatedAt: data.updatedAt,
  }
}
