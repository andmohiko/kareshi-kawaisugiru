import { FieldValue } from 'firebase/firestore'

export type DocId = string

export const ScenesCollection = 'scenes'

export const TagsCollection = 'tags'

export interface Tag {
  tagID: DocId
  createdAt: Date
  label: string
  scenesCount: number
  updatedAt: Date
}

export interface TagUI {
  tagID: Tag['tagID']
  createdAt: Tag['createdAt']
  isActive: boolean
  label: Tag['label']
  scenesCount: Tag['scenesCount']
  updatedAt: Tag['updatedAt']
}

export interface Scene {
  sceneId: DocId
  createdAt: Date
  likes: number
  screenshotURL: string
  shares: number
  tags: Tag['label'][]
  title: string
  updatedAt: Date
  userId: DocId | null
  videoName: string
}

export interface CreateSceneDto {
  createdAt: FieldValue
  likes: Scene['likes']
  screenshotURL: Scene['screenshotURL']
  shares: Scene['shares']
  tags: Scene['tags']
  title: Scene['title']
  updatedAt: FieldValue
  userId: Scene['userId']
  videoName: Scene['videoName']
}

export interface CreateSceneFormDto {
  title: Scene['title']
  videoName?: Scene['videoName']
}

export interface UpdateSceneDto {
  shares?: FieldValue
  updatedAt: FieldValue
}

export interface CreateTagDto {
  createdAt: FieldValue
  label: Tag['label']
  scenesCount: Tag['scenesCount']
  updatedAt: FieldValue
}

export interface CreateTagFormDto {
  label: Tag['label']
}
