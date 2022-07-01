//Página de um quizz
let quizzObject;

function openQuizz(element){
    document.querySelector("main").innerHTML = ''
    let quizzSelected = linkBuzzQuiz + `/${element.id}`
    let promise = axios.get(quizzSelected)
    promise.then(printObject)
}

function printObject(response){
    quizzObject = response.data;
    let quizzSelectedQuestions = quizzObject.questions
    const main = document.querySelector("main");
    main.innerHTML = `
    <div class ='topImage'>
    <img src="${quizzObject.image}">
    </div>
    <div class='quizzQuestions'>
    <div class='questionTop'>
        <p>${quizzSelectedQuestions[0].title}<p>
    </div>
    <div>
        <div>
            <img src="${quizzSelectedQuestions[0].answers[0].image}">
            <p>${quizzSelectedQuestions[0].answers[0].text}</p>
        </div>
        <div>
            <img src="${quizzSelectedQuestions[0].answers[1].image}">
            <p>${quizzSelectedQuestions[0].answers[1].text}</p>
        </div>
        <div>
            <img src="${quizzSelectedQuestions[0].answers[0].image}">
            <p>${quizzSelectedQuestions[0].answers[0].text}</p>
        </div>
        <div>
            <img src="${quizzSelectedQuestions[0].answers[1].image}">
            <p>${quizzSelectedQuestions[0].answers[1].text}</p>
        </div>
    </div>
    </div>
    `
}
