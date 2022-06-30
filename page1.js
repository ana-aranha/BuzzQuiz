//Lista de Quizzes
let linkBuzzQuiz = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes";
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
  const main = document.querySelector("main");
  if (userStorage.length === 0) {
    main.innerHTML = `
        <div class='nonQuizzes'>
        <h1>Você não criou nenhum</br>quizz ainda :(</h1>
        <button onclick='creattingQuiz()'>Criar Quizz</button>
        </div>
        <div class='otherQuizzes'></div>`;
  } else {
    main.innerHTML = `
        <div class='userSection'>
            <div class='sectionTitle'>
                <h1>Seus Quizzes</h1>
                <button><img src='img/button.svg' onclick='creattingQuiz()'></button>
            </div>
            <div class='userQuizzes'>
                <div class="quizz">
                <img src='img/quizz1.png'>
                <p>O quão Potterhead é você?</p>
                </div> 
                <div class="quizz">
                <img src='img/quizz1.png'>
                <p>O quão Potterhead é você?</p>
                </div> 
            </div>
        </div>
        <div class='otherQuizzes'></div>;
      `;
  }
}

function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

function renderQuiz(resposta) {
  quizzes = resposta.data;
  document.querySelector(".otherQuizzes").innerHTML = '<p class="tittleQuizzes">Todos os Quizes</p>'
  for (let i = 0; i < quizzes.length; i++) {
    if (isImage(quizzes[i].image)) {
      document.querySelector(".otherQuizzes").innerHTML += `
        <div class='quizzStyle' onclick='openQuizz(this)'>
        <img src='${quizzes[i].image}'>
        <p class='quizzTitle'>${quizzes[i].title}</p>
        <div>`;
    }
  }
}

yourQuizzes();
getQuiz();