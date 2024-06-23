import { initializeApp } from "firebase/app";
import { getDatabase, set, ref } from "firebase/database";
import { getAuth, signInWithEmailAndPassword }from "firebase/auth";
import { mod } from "./verificacao.js";
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
//cria variaveis relacionadas ao banco de dados
const app   = initializeApp(firebaseConfig);
const bd    = getDatabase(app);
const auth  = getAuth();

const button = document.getElementById("excluir");
button.addEventListener("click", (e) =>{
    let resp = confirm('Certeza que deseja excluir a sua conta?');
    const user = auth.currentUser;
    if(resp){// se o user tiver certeza que deseja excluir a sua conta o seguite codigo será executado
        
        e.preventDefault();
        mod(false);// modifica o valor da verificação, cancelando ela.
    
        const senha = prompt('para excluir sua conta, precisamos que infome a sua senha')
    
        auth.signOut().then(() =>{//tira o user de sua conta para poder loga-lo novamente
            signInWithEmailAndPassword(auth, user.email, senha).then(() =>{//reliza um login para verificar a segurança da exclusão de conta
                user.delete().then(() =>{//deleta user
                    const userRef = ref(bd, 'user/' + user.uid);
                    
                    set(userRef, null).then(() =>{//apaga dados do banco
                        console.log('dados excluidos com sucesso');
                    }).catch((error) =>{
                        console.log('erro ao excluir dados: ' + error.message);
                    });
                    alert('usuário excluído com sucesso! Você será movido para a tela inicial.');
                    window.location = '../index.html';

                }).catch((error) =>{
                    console.log('erro ao excluir usuário: ' + error.message);
                });

            }).catch((error) =>{
                console.log('erro ao excluir dados: ' + error.message);
            });


        }).catch((error) =>{
            alert('erro ao excluir conta, tente novamente depois.');
        })

    }
})