import { NextSeo } from 'next-seo'
import { TopContainer } from '~/features/top/components/TopContainer'

const IndexPage = () => {
  return (
    <>
      <NextSeo
        title="彼氏がかわいすぎる.com"
        description="うちの彼氏がかわいすぎる"
        nofollow={false}
        canonical={process.env.NEXT_PUBLIC_APP_URL}
        openGraph={{
          title: '彼氏がかわいすぎる.com',
          description: 'うちの彼氏がかわいすぎる',
          url: process.env.NEXT_PUBLIC_APP_URL,
          type: 'website',
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_APP_URL}/images/ogp.png`,
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
      <TopContainer />
    </>
  )
}

export default IndexPage
