import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'

const Editor = dynamic(
  () => import('../components/RealTimeQuillEditor'),
  { ssr: false }
)

export default function Home() {
  const apiKey = '14744409-3890-4728-9cfd-01a8396f102d';
  const username = 'SJ Developer';
  const [docs, updateDocs] = useState([
    { "id": "9d52d64b-f7c5-40de-8137-629376ffbc76", name: "doc1", "content": "Hello World" },
    { "id": "9d52d64b-f7c5-40de-8137-629376ffbc77", name: "doc2", "content": "One two three" }
  ])
  const [activeDoc, setActiveDoc] = useState(docs[0])
  const [codox, setCodoxInstance] = useState(null)

 useEffect(() => {
  const { Codox } = window;
  if (Codox) {
    const codoxInstance = new Codox()
    setCodoxInstance(codoxInstance)
  }
 }, [])

 const changeActiveDoc = (doc) => {
    
  if (doc.id !== activeDoc.id) {
    //leave the session
    codox && codox.stop();

    //create a new codox instance
    const codoxInstance = new Codox()
    setCodoxInstance(codoxInstance)
    setActiveDoc(doc)
  }

}

const updateContent = (docId, content) => {
  const updatedDoc = docs.map(doc => {
    if(doc.id === docId){
      return ({...doc, content})
    }
    return doc
  })
  updateDocs(updatedDoc)
}


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        {/* <script dangerouslySetInnerHTML={{ __html: `https://app.codox.io/plugins/wave.client.js?apiKey=1e04e4bb-7da6-429a-acd5-503e4078812c&app=froala`}} /> */}
        <link rel="icon" href="/favicon.ico" />
        {/* <link href="https://cdn1.codox.io/lib/css/wave.client.css" rel="stylesheet"/> */}
      </Head>

      <main className={styles.main}>
      <div className="document-container">
            <ul className="document-list">
              {codox && docs.map(d =>
                <li key={d.id} onClick={() => changeActiveDoc(d)}>
                  <a className={`document-link ${activeDoc.id === d.id && 'active'}`}>{d.name}</a>
                </li>
              )}

            </ul>
          </div>
          <div className="editors">
            {activeDoc.id ? <Editor
              username={username}
              apiKey={apiKey}
              codox={codox}
              docId={activeDoc.id}
              model={activeDoc.content}
              updateContent={updateContent}
            /> : null}

          </div>
      </main>
    </div>
  )
}
