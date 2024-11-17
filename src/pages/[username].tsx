import { KareshiContainer } from '~/features/kareshi/components/KareshiContainer'

import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { z } from 'zod'

import { Kareshi } from '~/entities/Kareshi'

type Props = {
  kareshi: Kareshi
}

const KareshiPage: NextPage<Props> = ({ kareshi }: Props) => {
  return <KareshiContainer kareshi={kareshi} />
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const { params } = ctx
  const validationResult = z
    .object({
      username: z.string(),
    })
    .safeParse(params)

  if (!validationResult.success) {
    return {
      notFound: true,
    }
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/kareshi/${validationResult.data.username}`,
  )
  const kareshi = await res.json()

  return {
    props: {
      kareshi,
    },
    revalidate: 300, // 5分ごとにページを再生成
  }
}

// ユーザーIDごとにページを生成
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], // 事前生成が不要なら空配列
    fallback: 'blocking', // 未生成ページはリクエスト時に生成
  }
}

export default KareshiPage
