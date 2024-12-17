import { NextSeo } from 'next-seo'

import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { z } from 'zod'
import { KareshiContainer } from '~/features/kareshi/components/KareshiContainer'
import { Kareshi } from '~/entities/Kareshi'

type Props = {
  kareshi: Kareshi
}

const KareshiPage: NextPage<Props> = ({ kareshi }: Props) => {
  const title = kareshi.kareshiName
    ? `${kareshi.kareshiName} | 彼氏がかわいすぎる.com`
    : '彼氏がかわいすぎる.com'
  const description = kareshi.kareshiName
    ? `私の彼氏の${kareshi.kareshiName}です`
    : 'うちの彼氏です。'
  const ogpImageUrl =
    kareshi.ogpImageUrl ?? `${process.env.NEXT_PUBLIC_APP_URL}/images/ogp.png`
  const kareshiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${kareshi.username}`
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        nofollow={false}
        canonical={process.env.NEXT_PUBLIC_APP_URL}
        openGraph={{
          title,
          description,
          url: kareshiUrl,
          type: 'website',
          images: [
            {
              url: ogpImageUrl,
              width: 800,
              height: 600,
              alt: '',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <KareshiContainer kareshi={kareshi} />
    </>
  )
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

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/kareshi/${validationResult.data.username}`,
    )
    if (!res.ok) {
      return {
        notFound: true,
      }
    }

    const kareshi = await res.json()
    return {
      props: {
        kareshi,
      },
    }
  } catch (e) {
    return {
      notFound: true,
    }
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
