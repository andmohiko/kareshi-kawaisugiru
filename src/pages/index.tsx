import { NextSeo } from 'next-seo'
import { TopContainer } from '~/features/top/components/TopContainer'

const IndexPage = () => {
  const title = '彼氏がかわいすぎる.com'
  const description = 'うちの彼氏がかわいすぎる'
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  const ogpImageUrl = `${appUrl}/images/ogp.png`
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
          url: appUrl,
          type: 'website',
          siteName: title,
          images: [
            {
              url: ogpImageUrl,
              width: 1200,
              height: 630,
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

export async function getStaticProps() {
  return {
    props: {},
  }
}

export default IndexPage
