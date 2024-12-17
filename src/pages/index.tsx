import { TopContainer } from '~/features/top/components/TopContainer'
import Head from 'next/head'

const IndexPage = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <>
      <Head>
        {/* OGPタグ */}
        <meta
          property="og:url"
          content="https://www.xn--n8jnck8c3rya5127g0wxa.com/"
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="彼氏がかわいすぎる.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ja_JP" />
        <meta
          property="og:image"
          content="https://www.xn--n8jnck8c3rya5127g0wxa.com/ogp.png"
        />
        {/* Twitterカード用 */}
        <meta
          property="twitter:image"
          content="https://www.xn--n8jnck8c3rya5127g0wxa.com/ogp.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="彼氏がかわいすぎる.com" />
        <meta
          property="twitter:description"
          content="うちの彼氏がかわいすぎる"
        />
      </Head>
      <TopContainer />
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      title: '彼氏がかわいすぎる.com',
      description: 'うちの彼氏がかわいすぎる',
    },
  }
}

export default IndexPage
