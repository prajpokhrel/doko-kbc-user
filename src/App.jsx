import { useEffect, useState } from 'react';
import './App.css';

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhxChNm5h3N68axgcQwQmYUgvmLgW1-Jo",
  authDomain: "doko-kbc.firebaseapp.com",
  projectId: "doko-kbc",
  storageBucket: "doko-kbc.appspot.com",
  messagingSenderId: "577907344225",
  appId: "1:577907344225:web:50f6063192d679f6ecbb20",
  measurementId: "G-GVGYT4EQQB"
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const DB = getFirestore();

function App() {

  const [question, setQuestion] = useState(null);

  const colRef = collection(DB, 'questions');
  const qr = query(colRef, where("displayed", "==", false), orderBy("createdAt"), limit(1));

  onSnapshot(qr, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      setQuestion({...doc.data(), id: doc.id});
    });
  });

  return (
    <>
        <div className='question-wrapper'>
          {
            question !== null ?
            <>
              <h2>{question.question}</h2>
              <ul>
                {
                  question.options.map((option, index) => {
                    return <li key={index}>{option}</li>;
                  })
                }
              </ul>
            </> : <span>The game has not been started yet!</span>
          }
        </div>
    </>
  )
}

export default App
