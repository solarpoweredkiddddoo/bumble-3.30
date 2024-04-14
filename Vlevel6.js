const questions = [
    {
        question:[
            " chutney", //word
            "(a relish of fruits and spices)", //definition
            " You can eat chutney straight away, but it's best once the flavors mellow after a month or so of aging.",  //sentence
            "Which definition best describes the word ‘chutney’?", //question
        ],
        answers: [
            { text: " a kind of chimney", correct: false}, 
            { text: "a basket used for fruits", correct: false},
            { text: "a relish of fruits, spices, herbs and vinegar", correct: true},
            { text: " a large amount of something", correct: false},
        ]
    },
{
question:[
            " domineer", //word
            "( to rule (over) in a harsh or arrogant way)", //definition
            " The lions always domineer over other competing predators in the area.",  //sentence
            "Which definition best describes the word ‘domineer’?", //question
        ],
        answers: [
            { text: "to have an adventure", correct: false}, 
            { text: "to escape from", correct: false},
            { text: "to observe from a far distance", correct: false},
            { text: "tyrannize", correct: true},
        ]
    },
{
        question:[
            " estuary", //word
            "( the wide mouth of a river into which the tide flows from the sea)", //definition
            " There are huge concentrations of people on the great river estuaries.",  //sentence
            "Which sentence uses the word ‘estuary’ appropriately?", //question
        ],
        answers: [
            { text: "A lot of crabs live in estuaries because there are lots of places to hide and feed.", correct: true}, 
            { text: "Estuaries cost a lot of money because of its wide space.", correct: false},
            { text: "My friend likes to eat estuaries because of its nutritional value.", correct: false},
            { text: "There are few estuaries found in a lot of people, especially amongst children.", correct: false},
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
