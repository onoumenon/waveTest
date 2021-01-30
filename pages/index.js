import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'

const Editor = dynamic(
  () => import('../components/Editor'),
  { ssr: false }
)

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Editor/>
      </main>
    </div>
  )
}
