import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { getAuth }from "firebase/auth"; 

const firebaseConfig = {
    apiKey: "AIzaSyBfJuEDQ7KIPO_feHPmtY4DXRPP-ZqpmVY",
    authDomain: "lamp-7fb6e.firebaseapp.com",
    databaseURL: "https://lamp-7fb6e-default-rtdb.firebaseio.com",
    projectId: "lamp-7fb6e",
    storageBucket: "lamp-7fb6e.appspot.com",
    messagingSenderId: "816320075310",
    appId: "1:816320075310:web:2ba343469b2ade2886f1bf"
};
// cria variaveis relacionadas ao firebase
const app       = initializeApp(firebaseConfig);
const storage   = getStorage(app);
const auth      = getAuth(app);

export var file = null;//cria variavel onde será armazenada a foto do user

export async function setPFP(user){

    const storageRef = ref(storage,'user-pfp/' + user.uid);// cria uma referencia para o storage
    
    await uploadBytes(storageRef, file)// envia a foto do user para o storage
}


export function getFile(e){//recebe a foto do usuario
    file = e.target.files[0];//recebe o primeiro 'file' do evento
    console.log(file);
}
    
// Função para obter a foto padrão
export function getDefaultPhoto(){
        return "assets/userPFP.png";// cria uma referencia a ser utilizada na foto padrão
}

//getPFP

export function getPFP(user){// recebe a foto do user ja definida no banco de dados
    const storageRef = ref(storage,'user-pfp/' + user.uid);
    getDownloadURL(storageRef).then((url) =>{//baixa o url da imagem
        const img = document.getElementById('pfp');
        
        if(img){// caso o elemento img exista
            img.setAttribute('src', url);//define o src da imagem na pagina de perfil com o url da imagem no storage
        }
        
        const nav = document.getElementById('pfpNav');
        if(nav){
            nav.setAttribute('src', url);//mesma coisa do codigo acima
        }
        
    }).catch((error) =>{
        console.log('erro ao inserir foto de usuario, error: ' + error.message);
    })
}

export function editFile(blob){
    file = new File([blob], "userPFP.png", { type: 'image/png' });
}