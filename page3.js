//Criação de Quizz
let newQuizQuestion;
let newQuizColor;
let correctAnswer;
let urlImage;
let wrongAnswer1;
let urlImage1;
let wrongAnswer2;
let urlImage2;
let wrongAnswer3;
let urlImage3;
let inputsArray
let numberQuestions = 0;
let numberLevels = 0;
let counter = 0;
const userNewQuiz = {
  title: "",
  image: "",
  questions: [],
  levels: [],
};

function creattingQuiz() {
  document.querySelector("main").innerHTML = `
    <div><p>Comece pelo começo<p></div>
    <div class='newQuiz'>
    <input type='text' placeholder='Título do seu quizz'>
    <input type='text' placeholder='URL da imagem do seu quizz'>
    <input type='text' placeholder='Quantidade de perguntas do quizz'>
    <input type='text' placeholder='Quantidade de níveis do quizz'>
    </div>
    <button class='createQuestions' onclick='creattingQuizData()'>Prosseguir pra criar perguntas</button>
    `;
}
function creattingQuizData() {
  let validation = 0;
  const inputs = document.querySelectorAll("input");
  for (i of inputs) {
    if (i.placeholder === "Título do seu quizz") {
      if (i.value.length > 19 && i.value.length < 66) {
        userNewQuiz.title = i.value;
        validation++;
      }
    } else if (i.placeholder === "URL da imagem do seu quizz") {
      console.log(1);
      if (isImage(i.value)) {
        userNewQuiz.image = i.value;
        validation++;
      }
    } else if (i.placeholder === "Quantidade de perguntas do quizz") {
      if (Number(i.value) > 2) {
        numberQuestions = Number(i.value);
        validation++;
      }
    } else if (i.placeholder === "Quantidade de níveis do quizz") {
      if (Number(i.value) > 1) {
        numberLevels = Number(i.value);
        validation++;
      }
    }
  }
  if (validation === 4) {
    creattingQuestions();
  } else {
    window.alert("Dados inválidos, por favor inserir novamente");
  }
}



function creattingQuestions() {
    document.querySelector("main").innerHTML = '<div><p>Crie suas Perguntas</p></div>'
    for(i=1;i<=numberQuestions;i++){
        document.querySelector("main").innerHTML += `    
          <div class="newQuiz">
          <p>Pergunta ${i}</p> 
          <img onclick="editQuestion(this) "src="img/Vector.png">
          </div>
          `;  
        }
        document.querySelector("main").innerHTML += `<button class='createQuestions' onclick="checkQuestions()">Prosseguir pra criar níveis</button>`
}

function editQuestion(element){
    const questionSelected = element.parentNode.querySelector("p").innerHTML
    element.parentNode.innerHTML = `
        <p>${questionSelected}</p>
        <div>
            <input type="text" placeholder="Texto da pergunta">
            <input type="text" placeholder="Cor de fundo da pergunta">
        </div>
        <p>Resposta Correta</p>
        <div>
            <input type="text" placeholder="Resposta correta">
            <input type="text" placeholder="URL da imagem">
        </div>
        <p>Resposta incorretas</p>
        <div>
            <input type="text" placeholder="Resposta incorreta 1">
            <input type="text" placeholder="URL da imagem1">
        </div>
        <div>
            <input type="text" placeholder="Resposta incorreta 2">
            <input type="text" placeholder="URL da imagem2">
        </div>
        <div>
            <input type="text" placeholder="Resposta incorreta 3">
            <input type="text" placeholder="URL da imagem3">
        </div>`
}

function gettingQuestion(element) {
    let inputsArray = element.querySelectorAll("input")
  if(inputsArray.length === 0){
    return
  }
  if (
    inputsArray[0].value != "" &&
    inputsArray[0].value.length > 19 &&
    inputsArray[1].value[0] === "#" &&
    inputsArray[1].value.length === 7
  ) {
    return true;
  } else {
    return false;
  }
}

function gettingCorrectAnswer(element) {
    let inputsArray = element.querySelectorAll("input")
    if(inputsArray.length === 0){
      return
    }
  if (inputsArray[2].value != "" && isImage(inputsArray[3].value)) {
    return true;
  } else {
    return false;
  }
}

function gettingWrongAnswer(element) {
    let inputsArray = element.querySelectorAll("input")
    if(inputsArray.length === 0){
      return
    }
  if (
    (inputsArray[4].value != "" && isImage(inputsArray[5].value)) ||
    (inputsArray[6].value != "" && isImage(inputsArray[7].value)) ||
    (inputsArray[8].value != "" && isImage(inputsArray[9].value))
  ) {
    return true;
  } else {
    return false;
  }
}

function checkQuestions(){
  questionsArray = document.querySelectorAll(".newQuiz")
  for(i=0;i<questionsArray.length;i++){
    checkQuestionValidation(questionsArray[i])
  }
  if (counter === numberQuestions){
    creattingQuizLevels();
    counter = 0
  } else {
    alert("Preencha os campos corretamentes");
    counter = 0
  }
}

function checkQuestionValidation(element) {
  if (
    gettingQuestion(element) === true &&
    gettingCorrectAnswer(element) === true &&
    gettingWrongAnswer(element) === true
  ) { counter ++}
}

function creattingQuizLevels() {
  document.querySelector("main").innerHTML = `    
    <div><p>Agora, decida os níveis!<p></div>`;
}
