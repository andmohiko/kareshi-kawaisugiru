import { useState, useEffect } from 'react'

import {
  collection,
  addDoc,
  doc,
  Firestore,
  updateDoc,
} from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'

import type { DocumentData } from 'firebase/firestore'

import { CreateSceneDto, DocId, Scene, UpdateSceneDto } from '~/entities'
import { db } from '~/lib/firebase'
// import { isDefined } from '~/utils/type'
// import { convertDate } from '../utils/date'

const ScenesCollection = 'scenes'

// export const useFetchScenes = (db: Firestore) => {
//   const fetchScenes = () => {
//     const [scenes, setScenes] = useState<Scene[]>()
//     const [value, loading, error] = useCollection(
//       collection(db, ScenesCollection),
//     )

//     useEffect(() => {
//       if (!value) return
//       const scenes = value.docs
//         .map((doc) => {
//           return sceneFactory(doc)
//         })
//         .filter(isDefined)
//       setScenes(scenes)
//     }, [value])

//     return scenes
//   }
//   return fetchScenes
// }

export const useScene = (db: Firestore, docId: string) => {
  const [scene, setScene] = useState<Scene>()
  const [value, loading, error] = useDocument(doc(db, ScenesCollection, docId))

  useEffect(() => {
    if (!value) return
    setScene(sceneFactory(value))
  }, [value])

  return {
    scene,
    loading,
    error,
  }
}

export const useCreateScene = () => {
  const createScene = async (dto: CreateSceneDto) => {
    const sceneRef = await addDoc(collection(db, ScenesCollection), dto)
    return sceneRef.id
  }
  return createScene
}

export const useUpdateScene = () => {
  const updateScene = async (sceneId: DocId, dto: UpdateSceneDto) => {
    await updateDoc(doc(db, ScenesCollection, sceneId), {
      ...dto,
    })
  }
  return updateScene
}

export const sceneFactory = (doc: DocumentData): Scene | undefined => {
  const data = doc.data()
  if (!data) return

  return {
    sceneId: doc.id,
    createdAt: data.createdAt,
    likes: data.likes,
    screenshotURL: data.screenshotURL,
    tags: data.tags,
    title: data.title,
    updatedAt: data.updatedAt,
    userId: data.userId,
    videoName: data.videoName,
  } as Scene
}
