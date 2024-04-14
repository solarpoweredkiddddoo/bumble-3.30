const passages = [
    {
        content: "The Industrial Revolution, which began in Britain in the late 18th century, marked a profound shift in human history. It brought about significant advancements in technology, transportation, and manufacturing processes, leading to unprecedented economic growth and urbanization. However, it also brought social and environmental challenges, including poor working conditions, pollution, and exploitation of natural resources. Despite its complexities, the Industrial Revolution laid the groundwork for the modern world and continues to shape society in profound ways.",
        questions: [
            {
                question:
                    "When and where did the Industrial Revolution begin?",
                answers: [
                    { text: "Spain, 19th century", correct: false},
                    { text: "Italy, 17th century", correct: false},
                    { text: "Britain, 18th century", correct: true},
                ]
            },
            {
                question:
                    "What were some of the positive and negative consequences of the Industrial Revolution?",
                answers: [
                    { text: "Rise of Technology; Climate Change", correct: false},
                    { text: "Economic growth; Exploitation of natural resources", correct: true},
                    { text: "Advancements in Transportation and Manufacturing processes; Global Warming", correct: false},
                ]
            }
        ]
    },
    {
        content: "In the quiet town of Eldridge, mysterious occurrences began to unfold. As the moon cast an eerie glow, whispers of ancient secrets echoed through the cobblestone streets. Detective Anderson took it upon himself to unravel the enigma that shrouded the town.",
        questions: [
            {
                question:
                    "What motivated Detective Anderson to investigate the mysterious occurrences in Eldridge?",
                answers: [
                    { text: "Personal curiosity", correct: true},
                    { text: "Assigned duty", correct: false},
                    { text: "A cryptic message", correct: false},
                ]
            },
            {
                question:
                    "What added an unsettling atmosphere to Eldridge's streets?",
                answers: [
                    { text: "A full moon", correct: false},
                    { text: "An approaching storm", correct: false},
                    { text: "Strange whispers", correct: true},
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
