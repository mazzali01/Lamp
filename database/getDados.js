import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth }from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyBfJuEDQ7KIPO_feHPmtY4DXRPP-ZqpmVY",
authDomain: "lamp-7fb6e.firebaseapp.com",
databaseURL: "https://lamp-7fb6e-default-rtdb.firebaseio.com",
projectId: "lamp-7fb6e",
storageBucket: "lamp-7fb6e.appspot.com",
messagingSenderId: "816320075310",
appId: "1:816320075310:web:2ba343469b2ade2886f1bf"
};

const app = initializeApp(firebaseConfig);
const bd = getDatabase(app);
const auth = getAuth();


function getDados(userRef){//exporta essa function para que eu possa a utilizar em qualquer lugar do site
    return new Promise((resolve, reject) =>{//faz com que essa function retorne uma promise
        onValue(userRef, (snapshot) =>{//tira um snapshot dos dados do user
            const dados = snapshot.val();
            if(dados){
                resolve(dados)//se der certo vai retornar o valor de dados na promisse
            }else{
                reject(new Error('Dados não encontrados'));//se der errado vai criar um erro
                console.log("Dados não encontrados");
            }
        }, (error) =>{
            reject(error)
            console.log(reject(error))
        })
    });
}


export default getDados;