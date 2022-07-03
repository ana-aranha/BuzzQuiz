//Lista de Quizzes
let linkBuzzQuiz = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes";
let quizzes;
let userStorage = [
  {
    id: 1,
    title: "Título do quizz",
    image: "https://http.cat/411.jpg",
    questions: [
      {
        title: "Título da pergunta 1",
        color: "#123456",
        answers: [
          {
            text: "Texto da resposta 1",
            image: "https://http.cat/411.jpg",
            isCorrectAnswer: true,
          },
          {
            text: "Texto da resposta 2",
            image: "https://http.cat/412.jpg",
            isCorrectAnswer: false,
          },
        ],
      },
      {
        title: "Título da pergunta 2",
        color: "#123456",
        answers: [
          {
            text: "Texto da resposta 1",
            image: "https://http.cat/411.jpg",
            isCorrectAnswer: true,
          },
          {
            text: "Texto da resposta 2",
            image: "https://http.cat/412.jpg",
            isCorrectAnswer: false,
          },
        ],
      },
      {
        title: "Título da pergunta 3",
        color: "#123456",
        answers: [
          {
            text: "Texto da resposta 1",
            image: "https://http.cat/411.jpg",
            isCorrectAnswer: true,
          },
          {
            text: "Texto da resposta 2",
            image: "https://http.cat/412.jpg",
            isCorrectAnswer: false,
          },
        ],
      },
    ],
    levels: [
      {
        title: "Título do nível 1",
        image: "https://http.cat/411.jpg",
        text: "Descrição do nível 1",
        minValue: 0,
      },
      {
        title: "Título do nível 2",
        image: "https://http.cat/412.jpg",
        text: "Descrição do nível 2",
        minValue: 50,
      },
    ],
  },
];
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
                <img src='${quiz.data.image}'>
                <p>${quiz.data.title}</p>
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
  for (let i = 0; i < quizzes.length; i++) {
    if (isImage(quizzes[i].image)) {
      document.querySelector(".otherQuizzes").innerHTML += `
        <div class='quizzStyle' id=${quizzes[i].id} onclick='openQuizz(this)'>
        <img src='${quizzes[i].image}'>
        <p class='quizzTitle'>${quizzes[i].title}</p>
        <div>`;
    }
  }
}

/* getQuiz(); */

/* yourQuizzes(); */
/* getStorage(); */
function quizSucess() {
  /* setStorage(response); */
  const main = document.querySelector("main");
  main.innerHTML = `
  <p>Seu quizz está pronto!</p>
  <div class="newQuiz"><img src=${userStorage[0].image}>
  <p>${userStorage[0].title}</p>
  </div>
  <button>Acessar Quizz</button>
  <h1>Voltar pra home</h1>
  `;
}
quizSucess();
