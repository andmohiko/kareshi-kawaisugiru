import { useState, useEffect } from 'react'

import { Stack } from '@mantine/core'
import { collection, orderBy, query } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'

import { SimpleLayout } from '~/components/Layouts/SimpleLayout'
import { LoadingScreen } from '~/components/LoadingScreen'
import { ScenesList } from '~/components/ScenesList'
import { TagUI, TagsCollection } from '~/entities'
import { tagFactory } from '~/hooks/useTags'
import { db } from '~/lib/firebase'
import { isDefined } from '~/utils/type'

const IndexPage = () => {
  const [tags, setTags] = useState<TagUI[]>()

  const [value, loading, error] = useCollection(
    query(collection(db, TagsCollection), orderBy('scenesCount', 'desc')),
  )

  useEffect(() => {
    if (!value) return
    const scenes = value.docs
      .map((doc) => {
        return tagFactory(doc)
      })
      .filter(isDefined)
    setTags(scenes)
  }, [value])

  if (loading || !tags) return <LoadingScreen />

  if (!value || error) return <LoadingScreen />

  return (
    <SimpleLayout tags={tags}>
      <Stack
        style={{
          height: '100%',
        }}
      >
        <ScenesList />
      </Stack>
    </SimpleLayout>
  )
}

export default IndexPage
