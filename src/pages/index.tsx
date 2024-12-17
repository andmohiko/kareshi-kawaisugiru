import { GetStaticProps } from 'next'
// import { NextSeo } from 'next-seo'
import { TopContainer } from '~/features/top/components/TopContainer'
import Head from 'next/head'

const IndexPage = () => {
  return (
    <>
      <Head>
        <meta
          property="og:url"
          content="https://www.xn--n8jnck8c3rya5127g0wxa.com/"
        />
        <meta property="og:title" content="彼氏がかわいすぎる.com" />
        <meta property="og:description" content="うちの彼氏がかわいすぎる" />
        <meta property="og:site_name" content="彼氏がかわいすぎる.com" />
        <meta
          property="canonical"
          content="https://www.xn--n8jnck8c3rya5127g0wxa.com/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ja_JP" />
        <meta
          property="og:url"
          content="https://www.xn--n8jnck8c3rya5127g0wxa.com/"
        />
        <meta
          property="og:image"
          content="https://www.xn--n8jnck8c3rya5127g0wxa.com/ogp.png"
        />
      </Head>
      {/* <NextSeo
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
      /> */}
      <TopContainer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60,
  }
}

export default IndexPage
