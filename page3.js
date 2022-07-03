let numberQuestions = 3;
let numberLevels = 0;
let counter = 0;
let valor;
let wrongOption = 0;
const userNewQuiz = {
  title: "",
  image: "",
  questions: [],
  levels: [],
};

function creattingQuiz() {
  document.querySelector("main").innerHTML = `
    <div><p>Comece pelo começo<p></div>
    <div class='infoNewQuiz'>
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
  ).innerHTML += `<button class='createQuestions' onclick="checkQuestions()">Prosseguir pra criar níveis</button>`;
}

function editQuestion(element) {
  const questionSelected = element.parentNode.querySelector("p").innerHTML;
  const parent = element.parentNode;
  parent.style.height = "82.5rem";
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
  setTimeout(() => {
    parent.scrollIntoView({ block: "center" });
  }, 1000);
}

function gettingQuestion(element) {
  let validation = 0;
  const hex = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "#",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
  ];
  let inputsArray = element.querySelectorAll("input");
  if (inputsArray.length === 0) {
    return;
  }
  if (
    inputsArray[0].value != "" &&
    inputsArray[0].value.length > 19 &&
    inputsArray[1].value[0] === "#" &&
    inputsArray[1].value.length === 7
  ) {
    for (letter of inputsArray[1].value) {
      if (hex.includes(letter)) {
        validation++;
      }
    }
  } else {
    return false;
  }
  if (validation === 7) {
    return true;
  } else {
    return false;
  }
}

function gettingCorrectAnswer(element) {
  let inputsArray = element.querySelectorAll("input");
  if (inputsArray.length === 0) {
    return;
  }
  if (inputsArray[2].value != "" && isImage(inputsArray[3].value)) {
    return true;
  } else {
    return false;
  }
}

function gettingWrongAnswer(element) {
  let inputsArray = element.querySelectorAll("input");
  wrongOption = 0;
  if (inputsArray.length === 0) {
    return;
  }
  if (inputsArray[4].value != "" && isImage(inputsArray[5].value)) {
    wrongOption++;
  }
  if (inputsArray[6].value != "" && isImage(inputsArray[7].value)) {
    wrongOption++;
  }
  if (inputsArray[8].value != "" && isImage(inputsArray[9].value)) {
    wrongOption++;
  }
  console.log(wrongOption);
  if (wrongOption > 0) {
    return true;
  } else if (wrongOption === 0) {
    console.log("deu ruim");
    return false;
  }
}

function questionObject(element) {
  let inputsArray = element.querySelectorAll("input");
  let wrong = {
    title: `${inputsArray[0].value}`,
    color: `${inputsArray[1].value}`,
    answers: [
      {
        text: `${inputsArray[2].value}`,
        image: `${inputsArray[3].value}`,
        isCorrectAnswer: true,
      },
    ],
  };
  for (i = 0; i <= wrongOption + 1; i += 2) {
    if (inputsArray[4 + i].value !== "") {
      wrong.answers.push({
        text: `${inputsArray[4 + i].value}`,
        image: `${inputsArray[5 + i].value}`,
        isCorrectAnswer: false,
      });
    }
  }
  userNewQuiz.questions.push(wrong);
  console.log(userNewQuiz);
  return;
}

function checkQuestions() {
  questionsArray = document.querySelectorAll(".newQuiz");
  console.log(questionsArray);
  for (x = 0; x < questionsArray.length; x++) {
    checkQuestionValidation(questionsArray[x]);
  }
  if (counter === numberQuestions) {
    counter = 0;
    creattingQuizLevels();
  } else {
    alert("Preencha os campos corretamentes");
    counter = 0;
  }
}

function checkQuestionValidation(element) {
  console.log(element);
  if (
    gettingQuestion(element) &&
    gettingCorrectAnswer(element) &&
    gettingWrongAnswer(element)
  ) {
    counter++;
    console.log(counter);
    questionObject(element);
  } else {
    console.log("elemento q deu merda");
    console.log(element);
  }
  return;
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
  parent.style.height = "27.2rem";
  const levelSelected = parent.querySelector("p").innerHTML;
  parent.innerHTML = `
        <p>${levelSelected}</p>
        <div class="level${levelSelected.charAt(
          levelSelected.length - 1
        )} choices">
            <input type="text" placeholder="Título do nível">
            <input type="text" placeholder="% de acerto mínima">
            <input type="text" placeholder="URL da imagem">
            <input type="text" placeholder="Descrição do nível">
        </div>`;
  setTimeout(() => {
    parent.scrollIntoView({ block: "center" });
  }, 1000);
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
    axios
      .post(
        "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",
        userNewQuiz
      )
      .then(quizSucess);
    getQuiz();
    getStorage();
    yourQuizzes();
  } else {
    alert("Pelo menos um dos níveis deve ter uma porcentagem de acerto 0");
  }
}
