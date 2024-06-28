import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { logar } from './exportLogin.js';
import { setPFP, getFile, getDefaultPhoto, file, editFile } from './getPFP.js';

// Função para exibir a tela de loading
function showLoadingScreen() {
    fetch('loadingScreen.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('.loadingScreen').innerHTML = data;
            document.body.classList.add('no-scroll'); // Adiciona a classe no-scroll ao body
        })
        .catch(error => {
            console.error("Erro ao carregar a tela de carregamento: ", error);
        });
}

// Função para ocultar a tela de loading
function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
        loadingScreen.remove();
        document.body.classList.remove('no-scroll');
    }
}

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
const auth = getAuth(app);

const btnCadastro = document.getElementById('bt_cad');
const apelido = document.getElementById('apelido');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const tel = document.getElementById('tel');
const dataNasc = document.getElementById('nasc');
const senha = document.getElementById('senha');
const fotoInput = document.getElementById('foto');
const image = document.getElementById('image');
const imgContainer = document.querySelector('.img-container');
const cortarImagem = document.querySelector('.cortar-imagem');
const cropButton = document.getElementById('cropButton');
let cropper;
let croppedBlob;

fotoInput.addEventListener('change', (e) => {
    const files = e.target.files;
    const done = (url) => {
        fotoInput.value = '';
        image.src = url;
        imgContainer.style.display = 'flex';
        cropButton.style.display = 'flex';
        cortarImagem.style.display = 'flex';
        if (cropper) {
            cropper.destroy();
        }
        cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 1,
        });
    };
    let reader;
    let file;
    if (files && files.length > 0) {
        file = files[0];
        if (URL) {
            done(URL.createObjectURL(file));
        } else if (FileReader) {
            reader = new FileReader();
            reader.onload = function (e) {
                done(reader.result);
            };
            reader.readAsDataURL(file);
        }
    } else {
        // Caso o usuário cancele a seleção da foto
        imgContainer.style.display = 'none';
        cropButton.style.display = 'none';
        cortarImagem.style.display = 'none';
    }
});

cropButton.addEventListener('click', () => {
    if (cropper) {
        const canvas = cropper.getCroppedCanvas({
            width: 400,
            height: 400,
        });
        canvas.toBlob((blob) => {
            croppedBlob = blob;
            cropButton.style.display = 'none';
        }, 'image/jpeg');
    }
});

btnCadastro.addEventListener('click', async function(e) {
    e.preventDefault();

    // Exibir a tela de loading
    showLoadingScreen();

    const emailValue = email.value;
    const senhaValue = senha.value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, emailValue, senhaValue);
        const user = userCredential.user;
        alert("Usuário criado com sucesso: " + apelido.value);

        await updateProfile(user, {
            displayName: apelido.value
        });

        if (croppedBlob) {
            editFile(croppedBlob);
            await setPFP(user);
        } else if (file === null) {
            const defaultPhotoPath = getDefaultPhoto();
            const response = await fetch(defaultPhotoPath);
            const blob = await response.blob();
            editFile(blob);
            await setPFP(user);
        } else {
            await setPFP(user);
        }

        await sendEmailVerification(user);
        alert('Enviamos um email de verificação de conta para você');
        await set(ref(bd, 'user/' + user.uid), {
            Apelido: apelido.value,
            Nome: nome.value,
            Email: email.value,
            Telefone: tel.value,
            Nascimento: dataNasc.value
        });

        console.log("salvo com sucesso");
        logar(e);
    } catch (error) {
        hideLoadingScreen(); // Ocultar a tela de loading em caso de erro
        console.log("o seguinte erro foi evidenciado: " + error);
        switch(error.message){
            case 'Firebase: Error (auth/invalid-email).':
                alert('Insira um email válido.');
                break;
            case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
                alert('Escolha uma senha mais forte.');
                break;
            case 'Firebase: Error (auth/email-already-in-use).':
                alert('Este email já está sendo utilizado.')
                break;
            default:
                alert('Ops! Não conseguimos criar a sua conta, tente novamente.')
        }
    }
});
