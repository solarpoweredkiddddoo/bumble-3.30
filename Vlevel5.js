const questions = [
    {
        question:[
            " asinine", //word
            "( like an ass; silly)", //definition
            "Now this was asinine enough to get him some serious humiliation",
            " Which word is similar to ‘asinine’?", //question
        ],
        answers: [
            { text: "a kind of dog", correct: false}, 
            { text: "ugly", correct: false},
            { text: "complicated", correct: false},
            { text: "stupid", correct: true},
        ]
    },
{
        question:[
            " aspire", //word
            "(to be ambitious (to get or do something))", //definition
            " Most children aspire to be doctors nowadays.",  //sentence
            " What definition best describes the word ‘aspire’?", //question
        ],
        answers: [
            { text: " to seek (after)", correct: true}, 
            { text: "inspire", correct: false},
            { text: "insult", correct: false},
            { text: "to think profoundly", correct: false},
        ]
    },
{
        question:[
            " baleful", //word
            "( harmful; dangerous)", //definition
            " Drug money has had a baleful impact on the country.",  //sentence
            "Which word is the opposite of ‘baleful’?", //question
        ],
        answers: [
            { text: "ominous", correct: false}, 
            { text: "safe", correct: true},
            { text: "deadly", correct: false},
            { text: "harmful", correct: false},
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
