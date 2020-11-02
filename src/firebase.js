import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBXNTpnmzsOnr2da_xEqOox3vLCq3As99A",
  authDomain: "whatsapp-clone-9dacf.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-9dacf.firebaseio.com",
  projectId: "whatsapp-clone-9dacf",
  storageBucket: "whatsapp-clone-9dacf.appspot.com",
  messagingSenderId: "304668840384",
  appId: "1:304668840384:web:646412c09301e47885f825",
  measurementId: "G-520849EYME"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);


const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;



