import { Stack, Anchor } from '@mantine/core'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

import { NoPlusLayout } from '~/components/Layouts/NoPlusLayout'
import { SceneDetailCard } from '~/components/SceneDetailCard'
import { Scene } from '~/entities'

type Props = {
  scene: Scene
}

const SceneDetailPage = ({ scene }: Props) => (
  <NoPlusLayout>
    <Head>
      <meta
        property="og:url"
        content={`https://tokai-db.vercel.app/scenes/${scene.sceneId}`}
      />
      <meta property="og:title" content={`東海スクショDB | ${scene.title}`} />
      <meta
        property="og:description"
        content={scene.videoName ?? '東海オンエアのすきなシーンを保存できます'}
      />
      <meta property="og:site_name" content="東海スクショDB" />
      <meta property="og:image" content={scene.screenshotURL} />
    </Head>

    <Stack
      justify="space-between"
      style={{
        gap: 160,
        textAlign: 'center',
      }}
    >
      <SceneDetailCard scene={scene} />
      <Anchor href="/">一覧へ戻る</Anchor>
    </Stack>
  </NoPlusLayout>
)

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/scenes/${id}`)
  const ogpData = await res.json()
  return { props: { scene: ogpData.data } }
}

export default SceneDetailPage
