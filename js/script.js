// Declaração variaveis

const question        = document.querySelector('#question');
const answersBox      = document.querySelector('#answers-box');
const quizzContainer  = document.querySelector('#quizz-container');
const scoreContainer  = document.querySelector('#score-container');
const letters         = ["a","b","c","d"];
let   points          = 0;
let   actualQuestion  = 0;


//Perguntas//

const questions = [
    {
        "question": "O que significa HTML?",
        "answers":[
            {
                "answer": "Hyper Text Markup Language",
                "correct": true
            },
            {
                "answer": "Hyper Text Maneger Language",
                "correct": false
            },
            {
                "answer": "Hype Trendding Max Language",
                "correct": false
            },
            {
                "answer": "Hyper Text Minimal Line",
                "correct": false
            },

        ]
    },
    
    {
        "question": "Qual das opções abaixo é uma linguagem que pode ser usada no back-end de aplicações ?",
        "answers":[
            {
                "answer": "Vs Code",
                "correct": false
            },
            {
                "answer": "CSS",
                "correct": false
            },
            {
                "answer": "HTML",
                "correct": false
            },
            {
                "answer": "Java",
                "correct": true
            },

        ]
    },
    
    {
        "question": "Qual linguagem não é usada no desenvolvimento web?",
        "answers":[
            {
                "answer": "CSS",
                "correct": false
            },
            {
                "answer": "JavaScript",
                "correct": false
            },
            {
                "answer": "Kotlin",
                "correct": true
            },
            {
                "answer": "HTML",
                "correct": false
            },

        ]
    },
    {
        "question": "Qual a linguagem de programação mais usada para o desenvolvimento web?",
        "answers":[
            {
                "answer": "Python",
                "correct": false
            },
            {
                "answer": "JavaScript",
                "correct": true
            },
            {
                "answer": "C#",
                "correct": false
            },
            {
                "answer": "Kotlin",
                "correct": false
            },

        ]
    },
]
// Substituição do quiz para a primeira pergunta

function init(){
    createQuestion(0);
}
//cria uma pergunta

function createQuestion(i){
//limpar a questão anterior

    const OldButtons = answersBox.querySelectorAll("button");
        OldButtons.forEach(function(btn){
            btn.remove();
    });

    //alterar o texto da pergunta

    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector('#question-number');

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i+1;

    //inserir alternativas

    questions[i].answers.forEach(function(answer,i){
        //cria o template do botão do quiz

        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);
        
        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        // remover hide e template

        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        //inserir a alternativa na tela

        answersBox.appendChild(answerTemplate);

        // inserir um evento de click no botão

        answerTemplate.addEventListener("click",function(){
            checkAnswer(this)
        })
    });

    //incrementar o numero da questão

    actualQuestion++
}

//Verificando resposta do usuario 

function checkAnswer(btn){

    const buttons = answersBox.querySelectorAll("button");
    //verifica se a resposta esta correta
    buttons.forEach(function(button){
        if(button.getAttribute("correct-answer")=="true"){

            button.classList.add("correct-answer");
            //checa se o usuario acertou

            if(btn===button){
                points++;
            }
        }else{
            button.classList.add("wrong-answer");
        }
    });
    // exibir proxima pergunta

    nextQuestion();

    function nextQuestion(){

        setTimeout(function(){
            if(actualQuestion >= questions.length){
                
                showSuccessMessage();
                return;
            }
            createQuestion(actualQuestion);
        },1000)
    }
}

//exibe a tela final

function showSuccessMessage(){
     hideOrShow();

    //trocar dados da tela de sucesso

    const score = ((points/questions.length)*100).toFixed(2);
    const displayScore = document.querySelector("#display-score span");
    displayScore.textContent = score.toString();

    //altera o numero de perguntar certas

    const correctAnswer =document.querySelector("#correct-answers")

    correctAnswer.textContent = points;

    //alterar o total de perguntas

    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;
}


 function hideOrShow(){
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
 }

 //Reinicio do quiz

 const restartBtn =document.querySelector("#restart");

 restartBtn.addEventListener("click",function(){
    actualQuestion = 0;
    points = 0;
    hideOrShow();
    init();
 })
//iniciando o quiz
init();