import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

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

const app       = initializeApp(firebaseConfig);
const bd        = getDatabase(app);


const fonte     = document.getElementById('fonte');
const enunciado = document.getElementById('enunciado');
const comando   = document.getElementById('comando');
const exp       = document.getElementById('exp');//explição do resultado
// const questFoto = document.getElementById('foto');
 // alternativas
const alt1 = document.getElementById('alt1'); 
const alt2 = document.getElementById('alt2');
const alt3 = document.getElementById('alt3');
const alt4 = document.getElementById('alt4');
const alt5 = document.getElementById('alt5')

const topico        = document.getElementById('listTopic');
const dificuldade   = document.getElementById('listDiff');

const resposta      = document.getElementById('resp')

const button        = document.getElementById('submit');

button.addEventListener("click", (e) =>{
    e.preventDefault();

    const questionData = {
        fonte: fonte.value,
        enunciado: enunciado.value,
        comando: comando.value,
        explicacao: exp.value,
        alternativas: {
            a: alt1.value,
            b: alt2.value,
            c: alt3.value,
            d: alt4.value,
            e: alt5.value
          },
        topico: topico.value,
        dificuldade: dificuldade.value,
        resposta: resposta.value  
    }
    console.log(questionData)

    const getLength = (topico, dificuldade) => {
        return new Promise((resolve, reject) => {
          const diffRef = ref(bd, `questions/${topico.value}/${dificuldade.value}`);
          onValue(diffRef, (snapshot) => {
            const length = snapshot.size;
            resolve(length);
          }, (error) => {
            reject(error);
          });
        });
      };

    const addNewQuestion = async (topico, dificuldade, questionData) => {
        try {
          const length = await getLength(topico, dificuldade);
          const newQuestionRef = ref(bd, `questions/${topico.value}/${dificuldade.value}/${length + 1}`);
          console.log(newQuestionRef)
          await set(newQuestionRef, questionData);
          console.log('Nova questão adicionada com sucesso!');
        } catch (error) {
          console.error('Erro ao adicionar nova questão:', error);
        }
      };

      addNewQuestion(topico, dificuldade, questionData);
    
    

})


