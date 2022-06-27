import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAuotxk4GqQGF7mus8Vnw6xKDg6-H9pgwE",
  authDomain: "clone-298ba.firebaseapp.com",
  projectId: "clone-298ba",
  storageBucket: "clone-298ba.appspot.com",
  messagingSenderId: "1084891120970",
  appId: "1:1084891120970:web:28628e7233381b3f476db3",
  measurementId: "G-QS9DJYPEN9"
};
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  export {db,auth};