import { NextSeo } from 'next-seo'
import { TopContainer } from '~/features/Top/components/TopContainer'

const IndexPage = () => {
  return (
    <>
      <NextSeo
        title="彼氏がかわいすぎる.com"
        description="彼氏がかわいすぎる.com"
        nofollow={false}
        canonical={'http://xn--n8jnck8c3rya5127g0wxa.com/'}
        openGraph={{
          title: '彼氏がかわいすぎる.com',
          description: '彼氏がかわいすぎる.com',
          url: 'http://xn--n8jnck8c3rya5127g0wxa.com/',
          type: 'website',
          images: [
            {
              url: '/images/ogp.png',
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
