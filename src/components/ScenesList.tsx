import { useState, useEffect, useMemo } from 'react'

import {
  Box,
  LoadingOverlay,
  Pagination,
  SimpleGrid,
  Stack,
} from '@mantine/core'
import { useDisclosure, usePagination } from '@mantine/hooks'
import { collection, orderBy, query } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'

import { SceneCard } from './SceneCard'

import { SceneDetailModal } from '~/components/SceneDetailModal'
import { Scene, ScenesCollection } from '~/entities'
import { sceneFactory } from '~/hooks/useScenes'
import { db } from '~/lib/firebase'
import { isDefined } from '~/utils/type'

const PAGE_SIZE = 30

export const ScenesList = () => {
  const [opened, handler] = useDisclosure(false)
  const [selectedScene, setSelectedScene] = useState<Scene>()
  const [scenes, setScenes] = useState<Scene[]>()
  const [page, onChange] = useState(1)
  const displayItems = useMemo(() => {
    return scenes?.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page)
  }, [scenes, page])
  const totalPages = useMemo(() => {
    if (!scenes) {
      return 1
    }
    return scenes.length / PAGE_SIZE + 1
  }, [scenes])
  const pagination = usePagination({
    total: totalPages,
    page,
    onChange,
  })
  const [value, loading, error] = useCollection(
    query(collection(db, ScenesCollection), orderBy('createdAt', 'desc')),
  )

  useEffect(() => {
    if (!value) return
    const scenes = value.docs
      .map((doc) => {
        return sceneFactory(doc)
      })
      .filter(isDefined)
    setScenes(scenes)
  }, [value])

  if (loading || !scenes)
    return <LoadingOverlay visible={loading} overlayBlur={2} />

  if (!value || error)
    return <LoadingOverlay visible={loading} overlayBlur={2} />

  return (
    <Stack
      justify="space-between"
      align="center"
      style={{
        height: '100%',
        paddingBottom: '96px',
      }}
    >
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 1570, cols: 3, spacing: 'md' },
          { maxWidth: 1182, cols: 2, spacing: 'md' },
          { maxWidth: 736, cols: 1, spacing: 'md' },
        ]}
        style={{
          gap: 40,
        }}
      >
        {displayItems?.map((s) => (
          <Box
            key={s.sceneId}
            onClick={() => {
              setSelectedScene(s)
              handler.open()
            }}
          >
            <SceneCard scene={s} />
          </Box>
        ))}
      </SimpleGrid>
      <Pagination
        page={pagination.active}
        onChange={pagination.setPage}
        total={totalPages}
      />

      {selectedScene && (
        <SceneDetailModal
          scene={selectedScene}
          opened={opened}
          onClose={handler.close}
        />
      )}
    </Stack>
  )
}
