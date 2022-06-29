//Criação de Quizz
let newQuizQuestion
let newQuizColor
let correctAnswer
let urlImage
let wrongAnswer1
let urlImage1
let wrongAnswer2
let urlImage2
let wrongAnswer3
let urlImage3

function creattingQuestions(){
    document.querySelector("main").innerHTML = `    
    <div><p>Crie suas Perguntas<p></div>
    <div class="newQuiz">
        <p>Pergunta 1</p>
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
        </div>
        <div>
            <input type="text" placeholder="Resposta incorreta 4">
            <input type="text" placeholder="URL da imagem4">
        </div>
    </div>
    <button onclick="checkQuestionValidation()">Proceguir pra criar níveis</button>
`
}

function gettingQuestion(){
    newQuizQuestion = document.querySelector(".newQuiz").querySelector("div:nth-child(2)").querySelector("input:first-child").value
    newQuizColor = document.querySelector(".newQuiz").querySelector("div:nth-child(2)").querySelector("input:last-child").value
    if(newQuizQuestion != '' && newQuizQuestion.length>19 && newQuizColor[0]==='#' && newQuizColor.length === 7){
        return true}
    else{return false}
}

function gettingCorrectAnswer(){
    correctAnswer = document.querySelector(".newQuiz").querySelector("div:nth-child(4)").querySelector("input:first-child").value
    urlImage = document.querySelector(".newQuiz").querySelector("div:nth-child(4)").querySelector("input:last-child").value
    if(correctAnswer != '' && isImage(urlImage) === true){
        return true}
    else{return false}
}

function gettingWrongAnswer(){
    wrongAnswer1 = document.querySelector(".newQuiz").querySelector("div:nth-child(6)").querySelector("input:first-child").value
    urlImage1 = document.querySelector(".newQuiz").querySelector("div:nth-child(6)").querySelector("input:last-child").value
    wrongAnswer2 = document.querySelector(".newQuiz").querySelector("div:nth-child(7)").querySelector("input:first-child").value
    urlImage2 = document.querySelector(".newQuiz").querySelector("div:nth-child(7)").querySelector("input:last-child").value
    wrongAnswer3 = document.querySelector(".newQuiz").querySelector("div:nth-child(8)").querySelector("input:first-child").value
    urlImage3 = document.querySelector(".newQuiz").querySelector("div:nth-child(8)").querySelector("input:last-child").value
    if((wrongAnswer1 != ''  && isImage(urlImage1))|| (wrongAnswer3 != ''  && isImage(urlImage2))|| (wrongAnswer3 != '' && isImage(urlImage3))){
        return true}
    else{return false}
}

function checkQuestionValidation(){
    if(gettingQuestion() === true && gettingCorrectAnswer() === true && gettingWrongAnswer() === true){   
        creattingQuizLevels()
    }else{
        alert("Preencha os campos corretamentes")
    }
}

function creattingQuizLevels(){
    document.querySelector("main").innerHTML = `    
    <div><p>Agora, decida os níveis!<p></div>`
}