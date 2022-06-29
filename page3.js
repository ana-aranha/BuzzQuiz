//Criação de Quizz

function creatingQuestions(){
    document.querySelector("main").innerHTML = `    
    <div><p>Crie suas Perguntas<p></div>
    <div class="newQuiz">
        <div>
            <p>Pergunta 1</p>
            <input type="text" placeholder="Texto da pergunta">
            <input type="text" placeholder="Cor de fundo da pergunta">
        </div>
        <div>
            <p>Resposta Correta</p>
            <input type="text" placeholder="Resposta correta">
            <input type="text" placeholder="URL da imagem">
        </div>
        <div>
            <p>Resposta incorretas</p>
            <input type="text" placeholder="Resposta incorreta 1">
            <input type="text" placeholder="">
        </div>
    </div>`
}