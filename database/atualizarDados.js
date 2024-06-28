import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth, updateProfile, sendPasswordResetEmail, sendEmailVerification }from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import getDados from "./getDados.js"

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

//criando variaveis referentes ao firebase
const app   = initializeApp(firebaseConfig);
const bd    = getDatabase(app);
const auth  = getAuth();

//variaves de elementos do html
const nome      = document.getElementById('nome');
const apelido   = document.getElementById('apelido');
const email     = document.getElementById('email');
const tel       = document.getElementById('telefone');
const nasc      = document.getElementById('nasc');
const button    = document.getElementById('edit');


//quando o estado da autenticação for alterado, ex: login e logout
auth.onAuthStateChanged((user) =>{

    if(user.emailVerified){//se o email estiver verificado
        console.log('O email do usuário ja foi verificado')
    }else{// se o email nao estiver verificado
        let resp = confirm('Seu email ainda não foi confirmado, podemos enviar um email de verificação para você?', 'sim', 'não');
            
        if(resp){// se o user aceitar enviaremos um email de verificação para ele
            sendEmailVerification(user).then(() =>{
                console.log('email de verificação enviado')
            }).catch((error) =>{
                console.log('erro ao enviar email de verificação: ' + error.message);
            })
        }
    }

});

button.addEventListener('click', (e) =>{
    e.preventDefault(); // Evita a submissão do formulário e a atualização da página
    const user = auth.currentUser;
    const userRef = ref(bd, 'user/' + user.uid);
    getDados(userRef).then(dados => {//recebe os dados do usuario para usar como referencia
        //caso o valor do campo for diferente do registrado no banco de dados, os dados serão atualizados
        if(nome.value !== dados.Nome){
            attData(nome, auth.currentUser);
        }

        if(apelido.value !== dados.Apelido){
            attData(apelido, auth.currentUser);
        }
    
        if(tel.value !== dados.Telefone){
            attData(tel, auth.currentUser);
        }

        if(nasc.value !== dados.Nascimento){
            attData(nasc, auth.currentUser);
        }
    });


   
});

function attData(input, user){
    //cria uma referencia como atributo para cada um dos dados
    nome.setAttribute('dataRef', 'Nome');
    apelido.setAttribute('dataRef', 'Apelido');
    email.setAttribute('dataRef', 'Email');
    tel.setAttribute('dataRef', 'Telefone');
    nasc.setAttribute('dataRef', 'Nascimento');

    var dataRef = input.getAttribute('dataRef');

    //cria um elemento que atualiza os dados do usuario com base na referencia do atributo
    let novosDados  = {}
    novosDados[dataRef] = input.value;
    //função de update dos dados
    const userRef = ref(bd, 'user/' + user.uid);
    update(userRef, novosDados).then(() =>{
        console.log("dados atualizados com sucesso");
    }).catch((error) =>{
        console.log('erro ao atualizar dados: ' + error.message )
    })
    //se o campo alterado for o apelido também sera alterado o displayName do user no auth
    if(dataRef == 'Apelido'){
        updateProfile(user,{
            displayName: apelido.value
        })
    }

    console.log(novosDados)

}

const altSenha = document.getElementById('altSenha');
altSenha.addEventListener('click', (e) =>{
    // envia um email de alteração de senha para o user
    const user = auth.currentUser;
    e.preventDefault();
    sendPasswordResetEmail(auth, email.value).then(() => {
        alert("enviamos um email de alteração de senha para você");
    }).catch((error) => {
        console.log("Erro ao enviar email de alteração de senha: " + error.message);
    })
});