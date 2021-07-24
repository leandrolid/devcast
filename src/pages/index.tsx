import Head from 'next/head'
import { Header } from '../components/Header'

export default function Home() {
  return (
    <>
      <Head>
        <title>Devcast</title>
        <meta name="description" content="Hear your favorite podcasts" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />
    </>
  )
}
