import Head from 'next/head'

export const PageHead = (): React.ReactElement => (
  <Head>
    <title>成し遂げる!!</title>
    <meta name="description" content="今年成し遂げることを書こう" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />
    <link rel="canonical" href="https://nashitogeru.andmohiko.dev/" />
    <link rel="icon" href="/favicon.ico" />

    {/* OGP */}
    <meta name="twitter:card" content="summary_large_image" />
  </Head>
)
