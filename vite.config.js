import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Lamp/',
  build: {
    outDir: 'dist',  // Diretório de saída
    rollupOptions: {
      input: {
        main: 'index.html',  // Página principal
        cadastro: 'public/cadastro.html',
        cadQuiz: 'public/cadQuiz.html',
        courses: 'public/courses.html',
        dashboard: 'public/dashboard.html',
        loadingScreen: 'public/loadingScreen.html',
        login: 'public/login.html',
        nav: 'public/nav.html',
        profile: 'public/profile.html',
        quizzes: 'public/quizzes.html',
        store: 'public/store.html'
      }
    }
  }
});