const questions = [
    {
        question:[
            " opulent", //word
            "(abundant)", //definition
            "  He lives a very opulent lifestyle.",  //sentence
            "  Which word is the opposite of ‘opulent’?", //question
        ],
        answers: [
            { text: "poor", correct: true}, 
            { text: " very wealthy", correct: false},
            { text: "rich", correct: false},
            { text: "abundant", correct: false},
        ]
    },
{
        question:[
            " perplex", //word
            "( uncertain, doubtful)", //definition
            " There was a look of perplexity on his face.",  //sentence
            "  Which word is similar to ‘perplex’?", //question
        ],
        answers: [
            { text: "simple", correct: false}, 
            { text: " confused", correct: true},
            { text: "certain", correct: false},
            { text: "dangerous", correct: false},
        ]
    },
{
        question:[
            " contemplate", //word
            "( to look at or think about intently)", //definition
            "  The results of a trade war are too horrifying to contemplate.",  //sentence
            " Which word is the opposite of ‘contemplate’?", //question
        ],
        answers: [
            { text: "to expect or intend", correct: false},
            { text: "to look at or think about intently", correct: false},
            { text: "ignore or disregard", correct: true},
            { text: "think profoundly at length", correct: false},
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
        window.location.href = "index.html"; 
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
