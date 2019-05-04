import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyDPAe75GOXhwEJJNqZMNpL4-cDK5bUhNPs',
  authDomain: 'chat-react-app-c820b.firebaseapp.com',
  databaseURL: 'https://chat-react-app-c820b.firebaseio.com',
  projectId: 'chat-react-app-c820b',
  storageBucket: 'chat-react-app-c820b.appspot.com',
  messagingSenderId: '717367868563'
}
firebase.initializeApp(config)

const db = firebase.firestore()

export { db, firebase }
