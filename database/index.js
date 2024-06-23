// Importando do pacote Firebase instalado via npm
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Se você estiver usando Firestore
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBfJuEDQ7KIPO_feHPmtY4DXRPP-ZqpmVY",
  authDomain: "lamp-7fb6e.firebaseapp.com",
  databaseURL: "https://lamp-7fb6e-default-rtdb.firebaseio.com",
  projectId: "lamp-7fb6e",
  storageBucket: "lamp-7fb6e.appspot.com",
  messagingSenderId: "816320075310",
  appId: "1:816320075310:web:2ba343469b2ade2886f1bf"
  };
// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Inicialize o Firestore (se estiver usando)
const db = getDatabase(app);
const auth = getAuth()

auth.onAuthStateChanged(user =>{
  if(user){
    const uid = user.uid;
    console.log(uid);
  }else{
    console.log('teamoluna', db)

  }
  
})