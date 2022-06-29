//Lista de Quizzes
let linkBuzzQuiz = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
let quizzes

function getQuiz(){
    let promise = axios.get(linkBuzzQuiz)
    promise.then(quizLoaded)
}

function quizLoaded(responsta){
    quizzes = responsta.data
    document.querySelector("main").innerHTML=`
    <div class='userQuizzes'>
    TESTE
    </div>
    <div class='otherQuizzes'></div>`
    renderQuiz()
}

function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

function renderQuiz(){
    for(let i=0;i<quizzes.length;i++){
        if(isImage(quizzes[i].image)){
        document.querySelector(".otherQuizzes").innerHTML += `
        <div class = 'quizzStyle' onclick='openQuizz(this)'>
        <img src='${quizzes[i].image}'>
        <p>${quizzes[i].title}</p>
        <div>`}
    }
}

getQuiz()