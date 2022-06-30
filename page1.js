let linkBuzzQuiz = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let quizzes;
let userStorage = [];
function getQuiz() {
  let promise = axios.get(linkBuzzQuiz);
  promise.then(renderQuiz);
}

function setStorage(obj) {
  userStorage.push(obj);
  let prepareStorage = JSON.stringify(userStorage);
  localStorage.setItem("userQuizzes", prepareStorage);
}
function getStorage() {
  userStorage = JSON.parse(localStorage.getItem("userQuizzes"));
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
            <div class='userQuizzes'></div> 
        </div>
        <div class='otherQuizzes'></div>;
      `;
    const myQuizzes = document.querySelector(".userQuizzes");
    for (quiz of userStorage) {
      myQuizzes.innerHTML += `
                <div class="quizzStyle">
                <img src='${quiz.image}'>
                <p>${quiz.title}</p>
                </div> `;
    }
  }
}

function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

function renderQuiz(resposta) {
  quizzes = resposta.data;
  document.querySelector(".otherQuizzes").innerHTML =
    '<p class="tittleQuizzes">Todos os Quizes</p>';
  for (let i = 0; i < quizzes.length - 1; i++) {
    if (isImage(quizzes[i].image)) {
      document.querySelector(".otherQuizzes").innerHTML += `
        <div class='quizzStyle' onclick='openQuizz(this)'>
        <img src='${quizzes[i].image}'>
        <p class='quizzTitle'>${quizzes[i].title}</p>
        <div>`;
    }
  }
}

getQuiz();
yourQuizzes();
getQuiz();
