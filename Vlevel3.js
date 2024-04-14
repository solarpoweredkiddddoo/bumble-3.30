const questions = [
    {
        question:[
            " implore", //word
            "(to beg (a person) to do something)", //definition
            " She implored her son not to go.",  //sentence
            "  Which definition best describes the word ‘implore’?", //question
        ],
        answers: [
            { text: "to explode", correct: false}, 
            { text: " to explore", correct: false},
            { text: "to ask earnestly for", correct: true},
            { text: "to explain (to a person)", correct: false},
        ]
    },
{
        question:[
            " pious", //word
            "(having or showing religious devotion; only seemingly virtuous; sacred)", //definition
            " They lived a quiet, pious life.",  //sentence
            "  Which word is similar to ‘pious’?", //question
        ],
        answers: [
            { text: "adventurous", correct: false}, 
            { text: " sacred", correct: true},
            { text: "luxurious", correct: false},
            { text: "quiet", correct: false},
        ]
    },
{
        question:[
            " prolific", //word
            "(producing many young or much fruit; turning out many products of the mind)", //definition
            " Mahogany was once prolific in the tropical forests.",  //sentence
            "   Which sentences use the word ‘prolific’ incorrectly?", //question
        ],
        answers: [
            { text: "Guppies are so prolific that in many countries they overwhelm native species in numbers.", correct: false}, 
            { text: "  Banana trees are prolific in the Philippines because of its tropical climate.", correct: false},
            { text: "Jenny is a prolific writer and has published over a 100 books.", correct: false},
            { text: "The bear acts prolific around the trees because it is hungry.", correct: true},
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
