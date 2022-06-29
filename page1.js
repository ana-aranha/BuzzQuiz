//Lista de Quizzes
let linkBuzzQuiz = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let quizzes;
let userStorage = [];
let prepareStorage = JSON.stringify(userStorage);
localStorage.setItem("quizzes", prepareStorage);
localStorage.setItem("quizzes", prepareStorage);
function getQuiz() {
  let promise = axios.get(linkBuzzQuiz);
  promise.then(renderQuiz);
}

function yourQuizzes() {
  if (userStorage.length === 0) {
    document.querySelector("main").innerHTML = `
        <div class='userQuizzes'>
        <h1>Você não criou nenhum</br>quizz ainda :(</h1>
        <button>Criar Quizz</button>
        </div>
        <div class='otherQuizzes'></div>`;
  }
}

function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

function renderQuiz(resposta) {
  quizzes = resposta.data;
  for (let i = 0; i < quizzes.length; i++) {
    if (isImage(quizzes[i].image)) {
      document.querySelector(".otherQuizzes").innerHTML += `
        <div class = 'quizzStyle' onclick='openQuizz(this)'>
        <img src='${quizzes[i].image}'>
        <p>${quizzes[i].title}</p>
        <div>`;
    }
  }
}

yourQuizzes();
getQuiz();
