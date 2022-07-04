//Lista de Quizzes
let linkBuzzQuiz = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes";
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
  if (userStorage === null) {
    userStorage = [];
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
                <div class="quizzStyle" id="${quiz.id}" onclick="openQuizz(this)">
                <img src='${quiz.image}'>
                <p>${quiz.title}</p>
                </div> `;
    }
  }
}

function isImage(url) {
  return (
    /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url) && url.startsWith("http")
  );
}

function renderQuiz(resposta) {
  quizzes = resposta.data;
  document.querySelector(".otherQuizzes").innerHTML =
  '<p class="tittleQuizzes">Todos os Quizes</p>';
  for (let i = 0; i < quizzes.length; i++) {

    if(userStorage.length === 0){
      if (isImage(quizzes[i].image)){
        document.querySelector(".otherQuizzes").innerHTML += `
          <div class='quizzStyle' id=${quizzes[i].id} onclick='openQuizz(this)'>
        <img src='${quizzes[i].image}' onerror="">
          <p class='quizzTitle'>${quizzes[i].title}</p>
          <div>`;
      }
    }

    else{
      for(let j=0;j<userStorage.length;j++){
        if (isImage(quizzes[i].image) && quizzes[i].id != userStorage[j].id) {
          document.querySelector(".otherQuizzes").innerHTML += `
            <div class='quizzStyle' id=${quizzes[i].id} onclick='openQuizz(this)'>
          <img src='${quizzes[i].image}' onerror="">
            <p class='quizzTitle'>${quizzes[i].title}</p>
            <div>`;
      }
      }
    }

  }
}
function quizSucess(response) {
  const completeQuiz = response.data;
  const main = document.querySelector("main");
  main.innerHTML = `
  <div class="create-sucess">
            <h1>Seu quizz está pronto!</h1>
            <div class="quiz-img">
                <img src="${completeQuiz.image}" alt="">
                <h2>${completeQuiz.title}</h2>
            </div>
            <div class="nav-buttons">
                <button class="button-quizz" id="${completeQuiz.id} "onclick="openQuizz(this)">Acessar Quizz</button>
                <button class="go-home" onclick="gen_Homepage()">Voltar pra home</button>
            </div>
    </div>
  `;
  setStorage(completeQuiz);
}

function gen_Homepage() {
  getStorage();
  yourQuizzes();
  getQuiz();
}

gen_Homepage();
