

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA6TX6JYyNNC4w-zO1n12k_-c0NDNh1XHE",
  authDomain: "votacao-f93ce.firebaseapp.com",
  projectId: "votacao-f93ce",
  storageBucket: "votacao-f93ce.appspot.com",
  messagingSenderId: "451411597392",
  appId: "1:451411597392:web:20f295e0c6c18bb426d955"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const storage = getStorage(app);

export { storage, db as default  }
