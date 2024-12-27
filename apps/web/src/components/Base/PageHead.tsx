import Head from 'next/head'

const title = '成し遂げる!!'
const description = '今年成し遂げることを書こう'
const appUrl = process.env.NEXT_PUBLIC_APP_URL

export const PageHead = (): React.ReactElement => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />

    {/* favicon */}
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="msapplication-TileColor" content="#323232" />
    <meta name="theme-color" content="#323232" />

    {/* ogp */}
    <link rel="canonical" href={appUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={appUrl} />
    <meta property="og:site_name" content={title} />
    {/* twitter */}
    <meta name="twitter:card" content="summary_large_image" />
  </Head>
)
