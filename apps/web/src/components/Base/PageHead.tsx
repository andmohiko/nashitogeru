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

    {/* favicon */}
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="msapplication-TileColor" content="#323232" />
    <meta name="theme-color" content="#323232" />
  </Head>
)
