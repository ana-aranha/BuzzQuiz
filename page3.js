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
let inputsArray;
let numberQuestions = 0;
let numberLevels = 0;
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
    alert("Dados inválidos, por favor inserir novamente");
  }
}

function creattingQuestions() {
  document.querySelector("main").innerHTML =
    "<div><p>Crie suas Perguntas</p></div>";
  for (i = 1; i <= numberQuestions; i++) {
    document.querySelector("main").innerHTML += `    
          <div class="newQuiz">
          <p>Pergunta ${i}</p> 
          <img onclick="editQuestion(this) "src="img/Vector.png">
          </div>
          `;
  }
  document.querySelector(
    "main"
  ).innerHTML += `<button class='createQuestions' onclick="checkQuestionValidation()">Prosseguir pra criar níveis</button>`;
}

function editQuestion(element) {
  const questionSelected = element.parentNode.querySelector("p").innerHTML;
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
        </div>`;
}

function gettingQuestion() {
  inputsArray = document.querySelectorAll("input");
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

function gettingCorrectAnswer() {
  inputsArray = document.querySelectorAll("input");
  if (inputsArray[2].value != "" && isImage(inputsArray[3].value) === true) {
    return true;
  } else {
    return false;
  }
}

function gettingWrongAnswer() {
  inputsArray = document.querySelectorAll("input");
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

function checkQuestionValidation() {
  if (
    gettingQuestion() === true &&
    gettingCorrectAnswer() === true &&
    gettingWrongAnswer() === true
  ) {
    creattingQuizLevels();
  } else {
    alert("Preencha os campos corretamentes");
  }
}

function creattingQuizLevels() {
  const main = document.querySelector("main");
  main.innerHTML = `    
    <div><p>Agora, decida os níveis!<p></div>`;
  for (i = 1; i <= numberLevels; i++) {
    main.innerHTML += `    
          <div class="newQuiz">
          <p>Nível ${i}</p> 
          <img onclick="editLevel(this)"src="img/Vector.png">
          </div>
          `;
  }
  main.innerHTML += `<button class='createQuestions' onclick='endLevels()'>Finalizar Quizz</button>`;
}
function editLevel(element) {
  const parent = element.parentNode;
  const levelSelected = parent.querySelector("p").innerHTML;
  parent.innerHTML = `
        <p>${levelSelected}</p>
        <div class="level${levelSelected.charAt(levelSelected.length - 1)}">
            <input type="text" placeholder="Título do nível">
            <input type="text" placeholder="% de acerto mínima">
            <input type="text" placeholder="URL da imagem">
            <input type="text" placeholder="Descrição do nível">
        </div>`;
  const lastChild = parent.querySelector("div").lastElementChild;
  console.dir(lastChild);
  lastChild.scrollIntoView();
}
function endLevels() {
  let validation = 0;
  let sendLevels = [];
  for (let numLevel = 1; numLevel <= numberLevels; numLevel++) {
    let levelInputs = document.querySelector(`.level${numLevel}`);
    console.log(levelInputs);
    let inputs = levelInputs.querySelectorAll("input");
    const tempObj = {
      title: "",
      image: "",
      text: "",
      minValue: 0,
    };
    for (textField of inputs) {
      if (
        textField.placeholder === "Título do nível" &&
        textField.value.length < 10
      ) {
        return alert("O título dos níveis devem ter mais de 10 caracteres");
      } else if (textField.placeholder === "Título do nível") {
        tempObj.title = textField.value;
      } else if (
        textField.placeholder === "% de acerto mínima" &&
        (Number(textField.value) < 0 ||
          Number(textField.value) > 100 ||
          isNaN(textField.value))
      ) {
        return alert(
          "As porcentagens de acerto mínima devem ser números entre 0 e 100"
        );
      } else if (textField.placeholder === "% de acerto mínima") {
        if (Number(textField.value) === 0) {
          validation++;
        }
        tempObj.minValue = Number(textField.value);
      } else if (
        textField.placeholder === "URL da imagem" &&
        (!isImage(textField.value) || !textField.value.includes("https://"))
      ) {
        console.log(!isImage(textField.value));
        console.log(!textField.value.includes("https://"));
        return alert("A URL da imagem deve ser um link de imagem válido");
      } else if (textField.placeholder === "URL da imagem") {
        tempObj.image = textField.value;
      } else if (
        textField.placeholder === "Descrição do nível" &&
        textField.value.length < 30
      ) {
        return alert("Descrição deve possuir mais de 30 caracteres");
      } else if (textField.placeholder === "Descrição do nível") {
        tempObj.text = textField.value;
      }
    }
    sendLevels.push(tempObj);
  }
  if (validation !== 0) {
    userNewQuiz.levels = sendLevels;
    console.dir(userNewQuiz);
  } else {
    alert("Pelo menos um dos níveis deve ter uma porcentagem de acerto 0");
  }
}
