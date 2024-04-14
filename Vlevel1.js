const questions = [
    {
        question:[
            "Ninny", //word
            "(a fool; dolt)", //definition
            "Don't be a ninny darling, you can't fly.",  //sentence
            "Which of these words describe a ninny?", //question
        ],
        answers: [
            { text: "A smart person", correct: false}, 
            { text: "Someone who helps with household chores", correct: false},
            { text: "A poor person", correct: false},
            { text: "A dumb person", correct: true},
        ]
    },
    {
        question:[
            "Serene",
            "(clear; unclouded; undisturbed; calm)",
            "Her eyes were closed and she looked very serene.",
            "Which of the following sentences uses ‘serene’ incorrectly?",
        ],
        answers: [
            { text: "I always go to serene places to calm myself whenever I get upset.", correct: false},
            { text: "He has a serene mind because he panics most of the time.", correct: true},
            { text: "They always go to the mountains to see the serene view it offers.", correct: false},
            { text: "The nurse seems so serene all the time so as to not disturb the patients. ", correct: false},
        ]
    },
    {
        question:[
            "Denigrate",
            "(to belittle the character of)",
            "They insult their opponents, they denigrate their arguments and they offer few facts.",
            "Which phrase is similar to denigrate?",
        ],
        answers: [
            { text: "to  defame", correct: true},
            { text: "to cook", correct: false},
            { text: "to praise", correct: false},
            { text: "to express in a professional manner", correct: false},
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion(){
    const questionElement = document.getElementById("question");
    const answerButton = document.getElementById("answer-btns");
    const nextButton = document.getElementById("nxt-btn");

    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    let questionHTML = questionNo + ". ";
    currentQuestion.question.forEach((part, index) => {
        if (index === 2) {
            questionHTML += `<span style="color: gray;">"${part}"</span><br>`;
        } else if (index > 0 && index < 3) {
            questionHTML += `<span style="color: gray;">${part}</span><br>`;
        } else {
            questionHTML += part + "<br>";
        }
    });
    questionElement.innerHTML = questionHTML;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", () => selectAnswer(answerButton, nextButton));
    });
    let questionsLeft = questions.length - (currentQuestionIndex + 1); // Calculate questions left
    let indicator = document.createElement("div"); // Create indicator element
    indicator.textContent = `${currentQuestionIndex + 1} out of ${questions.length} `; // Set text content
    indicator.classList.add("question-indicator"); // Add CSS class
    document.querySelector('.word').appendChild(indicator); // Append indicator to container
}

function resetState(){
    const answerButton = document.getElementById("answer-btns");
    const nextButton = document.getElementById("nxt-btn");

    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(answerButton, nextButton){
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = "Show Score";
    }
}

function showScore(){
    const questionElement = document.getElementById("question");
    const nextButton = document.getElementById("nxt-btn");

    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Back";
    nextButton.style.display = "block";

    nextButton.addEventListener("click", () => {
        window.location.href = "index.html"; // Redirect to modeselector.html
    });
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
    let previousIndicator = document.querySelector(".question-indicator");
    if (previousIndicator) {
        previousIndicator.remove();
    }
}

document.getElementById("nxt-btn").addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
