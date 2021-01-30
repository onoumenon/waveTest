import React, {useEffect, useState} from 'react'
import RealTimeQuillEditor from './RealTimeQuillEditor'

export default function Home() {
  const apiKey = '14744409-3890-4728-9cfd-01a8396f102d';
  const user = {name: 'SJ Developer', id: 1, email: 'dev@sj.com', color: 'pink'};
  const [docs, updateDocs] = useState([
    { "id": "9d52d64b-f7c5-40de-8137-629376ffbc76", name: "doc1", "content": "Hello World" },
    { "id": "9d52d64b-f7c5-40de-8137-629376ffbc77", name: "doc2", "content": "One two three" }
  ])
  const [activeDoc, setActiveDoc] = useState(docs[0])
  const [codox, setCodoxInstance] = useState(null)

  const { Codox } = window;

  useEffect(() => {
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
    <div>
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
        {activeDoc.id ? <RealTimeQuillEditor
          user={user}
          apiKey={apiKey}
          codox={codox}
          docId={activeDoc.id}
          model={activeDoc.content}
          updateContent={updateContent}
        /> : null}
      </div>
    </div>
  )
}
