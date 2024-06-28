import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAuth }from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getPFP } from "./getPFP.js";
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

const app   = initializeApp(firebaseConfig);
const bd    = getDatabase(app);
const auth  = getAuth();

auth.onAuthStateChanged((user) =>{

    const list = document.getElementById("lista");

    if(user){//cria elementos e os adiciona na nav se o user estiver logado

        var dashLi = document.createElement("li"); 
        var dashA  = document.createElement("a");
        dashA.setAttribute("href", "dashboard.html");
        dashA.innerText = 'Dashboard';
        dashLi.appendChild(dashA);

        //MarketPlace

        var store      = document.createElement('li')
        var storeLink  = document.createElement('a')

        store.setAttribute('id', 'store');
        storeLink.innerText = 'Fichas Girino'; 
        storeLink.setAttribute('href', 'store.html');

        store.appendChild(storeLink)


        //img profile
        var profileLi   = document.createElement('li');
        profileLi.setAttribute('id', 'PFPli')
        var profileA    = document.createElement('a');
        profileA.setAttribute('href', 'profile.html');
        var profileImg  = document.createElement('img');
        profileImg.setAttribute('id', 'pfpNav');

        getPFP(user);
        profileA.appendChild(profileImg);
        profileLi.appendChild(profileA)
        
        //logout

        var logoutLi   = document.createElement('li');
        var logoutA    = document.createElement('a');
        logoutA.setAttribute('id', 'logout');
        logoutA.innerText = 'Sair';
        logoutLi.appendChild(logoutA);

        //function de logout
            logoutLi.addEventListener('click', (e)=>{
                e.preventDefault();
                const user = auth.currentUser;
                console.log(user)

                auth.signOut().then(() => {
                    console.log('voce foi deslogado')
                    window.location = '../index.html';
                }).catch((error) =>{
                    alert('não foi possivel realizar o logout, tente novamente mais tarde.\nErro: ' + error.message);
                })

        });
        //adicionando elementos para a lista
        list.appendChild(store);
        list.appendChild(dashLi);
        list.appendChild(logoutLi);
        list.appendChild(profileLi);

    }else{
        var loginLi = document.createElement("li");
        var loginA = document.createElement("a");
        loginA.setAttribute("href", "login.html");
        loginA.innerText = 'Entrar';

        var cadastroLi = document.createElement("li");
        var cadastroA = document.createElement("a");
        cadastroA.setAttribute("href", "cadastro.html");
        cadastroA.innerText = 'Cadastrar-se';

        loginLi.appendChild(loginA);
        cadastroLi.appendChild(cadastroA);

        list.appendChild(cadastroLi);
        list.appendChild(loginLi);

    }

});