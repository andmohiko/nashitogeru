import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import { GoalContainer } from '~/features/goal/components/GoalContainer'

const IndexPage: NextPage = () => {
  const title = '成し遂げる!!'
  const description = '今年成し遂げることを書こう'
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

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
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <GoalContainer />
    </>
  )
}

export default IndexPage
