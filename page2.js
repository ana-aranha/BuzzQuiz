//Página de um quizz
let quizzObject;
let quizzSelectedQuestions;


function comparador() { 
	return Math.random() - 0.5; 
}

function openQuizz(element){
    document.querySelector("main").innerHTML = ''
    let quizzSelected = linkBuzzQuiz + `/${element.id}`
    let promise = axios.get(quizzSelected)
    promise.then(printObject)
}

function printObject(response){
    quizzObject = response.data;
    quizzSelectedQuestions = quizzObject.questions
    let main = document.querySelector("main");
    main.innerHTML = `
    <div class ='topImage'>
    <img src="${quizzObject.image}">
    <p>${quizzObject.title}</p>
    </div>
    <div class='container'></div>
`
    renderQuestions()
}

function renderQuestions(){
    let questionsDiv = document.querySelector(".container");
    for(i=0;i<quizzSelectedQuestions.length;i++){
        answersArray = quizzSelectedQuestions[i].answers
        answersArray.sort(comparador)
        let answersDiv = "";
        for(x=0;x<answersArray.length;x++){
            answersDiv +=
            `<div onclick="selectAnswer(this)">
                <img src="${quizzSelectedQuestions[i].answers[x].image}">
                <p>${quizzSelectedQuestions[i].answers[x].text}</p>
            </div>`
        }
        questionsDiv.innerHTML += 
        `<div class='quizzQuestions'>
            <div class='questionTop' style="background-color:${quizzSelectedQuestions[i].color}">
                <p>${quizzSelectedQuestions[i].title}<p>
            </div>
            <div>${answersDiv}</div>
        </div>`
    }

    const element = document.querySelector('.demo');
element.style.backgroundColor = 'red';
}

function selectAnswer(element){
    let questionSelected = element.parentNode;
    questionSelected.classList.add('opacity')
    element.classList.add('notOpacity')
}