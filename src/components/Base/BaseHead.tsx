import Head from 'next/head'

export const BaseHead = () => (
  <Head>
    <title>彼氏がかわいすぎる.com</title>
    <meta name="description" content="うちの彼氏がかわいすぎる" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />

    {/* favicon */}
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="msapplication-TileColor" content="#323232" />
    <meta name="theme-color" content="#ffffff" />

    {/* OGP */}
    <meta name="twitter:card" content="summary_large_image" />
  </Head>
)
