const passages = [
    {
        content: "In the peaceful forest, sunlight shines through the trees, creating a magical atmosphere. Among the sounds of leaves rustling and animals calling, there's a untouched world. Moss-covered stones, marking the passage of time, add to the ancient feel. Here, nature's symphony plays freely, a beautiful blend of life.",
        questions: [
            {
                question:
                    " What contributes to the ancient feel of the forest?",
                answers: [
                    { text: "Sunlight filtering", correct: false},
                    { text: "Rustling leaves", correct: false},
                    { text: "Moss-covered stones", correct: true},
                ]
            },
            {
                question:
                    "What is described as 'a beautiful blend of life'?",
                answers: [
                    { text: "Sunlight", correct: false},
                    { text: "Moss-covered stones", correct: false},
                    { text: "Nature's symphony", correct: true},
                ]
            }
        ]
    },
    {
        content: "Under the sparkling ocean surface, colorful life moves gracefully. Coral reefs, bustling with marine creatures, offer shelter and food for many species. Fish swim through the intricate formations while sea turtles glide elegantly. This underwater realm is full of marvels, where every creature has a vital role.",
        questions: [
            {
                question:
                    "What provides shelter and food for many marine species?",
                answers: [
                    { text: "Fish", correct: false},
                    { text: "Coral reefs", correct: true},
                    { text: "Sea turtles", correct: false},
                ]
            },
            {
                question:
                    "What is described as 'full of marvels' in this passage?",
                answers: [
                    { text: "Underwater realm", correct: true},
                    { text: "Coral reefs", correct: false},
                    { text: "Sea turtles", correct: false},
                ]
            }
        ]
    }
]

let currentPassageIndex = 0;
let currentQuestionIndex = 0;
let score = 0;
let allQuestionsAnswered = false; // New variable to track if all questions have been answered
let totalQuestionsInLevel = 0;

function startQuiz() {
    currentPassageIndex = 0;
    currentQuestionIndex = 0;
    score = 0;
    allQuestionsAnswered = false; // Reset the variable
    totalQuestionsInLevel = 0;
    passages.forEach(passage => {
        totalQuestionsInLevel += passage.questions.length;
    });
    showPassage();
    showQuestion();
}

function showPassage() {
    const passageContent = document.getElementById("passage-content");
    passageContent.textContent = passages[currentPassageIndex].content;
}

function showQuestion() {
    const questionElement = document.getElementById("question");
    const answerButton = document.getElementById("answer-btns");
    const questionCounter = document.getElementById("question-counter"); // Get the question counter element
    resetState();

    let totalQuestions = 0;
    passages.forEach(passage => {
        totalQuestions += passage.questions.length;
    });
    let currentPassage = passages[currentPassageIndex];
    let currentQuestion = currentPassage.questions[currentQuestionIndex];
    let passageNo = currentPassageIndex + 1;
    let questionNo = currentQuestionIndex < 2 ? currentQuestionIndex + 1 : "1." + (currentQuestionIndex - 1);
    let questionHTML = passageNo + "." + questionNo + " " + currentQuestion.question;
    questionElement.textContent = questionHTML;
    questionCounter.textContent = `Question ${calculateQuestionIndex()} of ${totalQuestionsInLevel}`;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function calculateQuestionIndex() {
    let questionIndex = 0;
    for (let i = 0; i < currentPassageIndex; i++) {
        questionIndex += passages[i].questions.length;
    }
    return questionIndex + currentQuestionIndex + 1;
}

function resetState() {
    const answerButton = document.getElementById("answer-btns");
    const nextButton = document.getElementById("nxt-btn");

    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(event) {
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++; // Increment score by 1 for each correct answer
    } else {
        selectedBtn.classList.add("incorrect");
    }
    const answerButton = document.getElementById("answer-btns");
    const nextButton = document.getElementById("nxt-btn");
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    if (currentQuestionIndex === passages[currentPassageIndex].questions.length - 1) {
        nextButton.textContent = "Next Passage";
    }
}

function handleNextButton() {
    console.log("Current Passage Index:", currentPassageIndex);
    console.log("Total Passages:", passages.length);
    currentQuestionIndex++;
    if (currentPassageIndex < passages.length) {
        let currentPassage = passages[currentPassageIndex];
        console.log("Current Passage:", currentPassage);
        if (currentPassage && currentPassage.questions) {
            if (currentQuestionIndex < currentPassage.questions.length) {
                showQuestion();
            } else {
                console.log("No more questions for this passage");
                currentPassageIndex++;
                currentQuestionIndex = 0; // Reset question index
                if (currentPassageIndex < passages.length) {
                    showPassage();
                    showQuestion();
                } else {
                    console.log("End of passages. Showing score.");
                    allQuestionsAnswered = true; // Set to true when all questions have been answered
                    showScore();
                }
            }
        } else {
            console.log("Current passage or questions are undefined.");
        }
    }
}

function showScore() {
    const passageContent = document.getElementById("passage-content");
    const questionElement = document.getElementById("question");
    const nextButton = document.getElementById("nxt-btn");

    resetState();

    // Hide passage content
    passageContent.style.display = "none";

    // Check if all questions have been answered
    if (allQuestionsAnswered) {
        // Calculate the total number of questions
        let totalQuestions = 0;
        passages.forEach(passage => {
            totalQuestions += passage.questions.length;
        });

        // Display the score
        questionElement.innerHTML = `You scored ${score} out of ${totalQuestions}!`;
        nextButton.innerHTML = "Back";
        nextButton.style.display = "block";

        nextButton.addEventListener("click", () => {
            window.location.href = "index.html"; 
        });
    }
}


document.getElementById("nxt-btn").addEventListener("click", () => {
    if (currentQuestionIndex < passages[currentPassageIndex].questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
