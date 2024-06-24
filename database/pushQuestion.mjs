import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';
import path from 'path';

// Obtém o caminho do diretório atual do módulo
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Caminho relativo para o arquivo JSON de credenciais
const serviceAccountPath = path.resolve(__dirname, '../database/credenciais.json');

// Carrega o arquivo JSON de credenciais usando import com a assertiva de tipo
let serviceAccount;
try {
  serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
} catch (err) {
  console.error(`Erro ao carregar arquivo de credenciais: ${err}`);
  process.exit(1);
}

// Inicializa o Firebase Admin SDK com as credenciais
const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://lamp-7fb6e-default-rtdb.firebaseio.com/'
};

try {
  admin.initializeApp(firebaseConfig);
} catch (err) {
  console.error('Erro ao inicializar o Firebase Admin SDK:', err.stack);
  process.exit(1);
}

const db = admin.firestore();

// Caminho relativo para o arquivo JSON com as perguntas
const questionsPath = path.resolve(__dirname, '../database/addQuestions.json');

// Carrega o arquivo JSON com as perguntas
let questions;
try {
  questions = JSON.parse(readFileSync(questionsPath, 'utf-8'));
} catch (err) {
  console.error(`Erro ao carregar arquivo de perguntas: ${err}`);
  process.exit(1);
}

// Função assíncrona para adicionar perguntas ao Firestore
async function adicionarQuestions() {
  const batch = db.batch();

  questions.forEach((pergunta, index) => {
    const docRef = db.collection('questions').doc(`pergunta_${index}`);
    batch.set(docRef, pergunta);
  });

  await batch.commit();
  console.log('Perguntas adicionadas com sucesso!');
}

// Executa a função para adicionar perguntas
adicionarQuestions().catch(console.error);
