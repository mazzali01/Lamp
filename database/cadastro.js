import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, updateProfile , sendEmailVerification } from "firebase/auth";
import { logar } from './exportLogin.js';
import { setPFP, getFile, getDefaultPhoto, file, editFile } from './getPFP.js';

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

btnCadastro.addEventListener('click', function(e) {
    e.preventDefault();

    const emailValue = email.value;
    const senhaValue = senha.value;

    createUserWithEmailAndPassword(auth, emailValue, senhaValue).then((userCredential) => {
        const user = userCredential.user;
        alert("Usuário criado com sucesso: " + apelido.value);

        updateProfile(user, {
            displayName: apelido.value
        });

        if (croppedBlob) {
            editFile(croppedBlob);
            setPFP(user);
        } else if (file === null) {
            const defaultPhotoPath = getDefaultPhoto();
            fetch(defaultPhotoPath)
                .then(response => response.blob())
                .then(blob => {
                    editFile(blob);
                    setPFP(user);
                }).catch(error => console.error('Erro ao carregar a foto padrão:', error));
        } else {
            setPFP(user);
        }

        sendEmailVerification(user).then(() => {
            alert('enviamos um email de verificação de conta para você');
        }).catch(error => {
            console.log('erro ao enviar email de verificação')
        });

        return set(ref(bd, 'user/' + user.uid), {
            Apelido: apelido.value,
            Nome: nome.value,
            Email: email.value,
            Telefone: tel.value,
            Nascimento: dataNasc.value
        });

    }).then(() => {
        console.log("salvo com sucesso");
        logar(e);
    }).catch(error => {
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

    });

});
