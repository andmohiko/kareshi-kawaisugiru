import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { NotFoundContainer } from '~/features/custom/components/NotFoundContainer'

const Custom404: NextPage = () => {
  return (
    <>
      <NextSeo
        title="彼氏がかわいすぎる.com"
        description="彼氏がかわいすぎる.com"
        nofollow={false}
        canonical={process.env.NEXT_PUBLIC_APP_URL}
        openGraph={{
          title: '彼氏がかわいすぎる.com',
          description: '彼氏がかわいすぎる.com',
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
      <NotFoundContainer />
    </>
  )
}

export default Custom404
