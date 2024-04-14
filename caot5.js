const passages = [
    {
        content: "The thunderclaps came closer, echoing like the footfalls of an angry god across the vast marble pavement of the sky. Lightning speared down, momentarily turning the world into a blinding tableau of silver and black. Rain lashed against the windows, a relentless drumbeat against the silence of the house.",
        questions: [
            {
                question:
                    "What is the author's purpose in using such vivid imagery in this passage? How does it contribute to the overall atmosphere of the story?",
                answers: [
                    { text: "to create a suspenseful and foreboding atmosphere", correct: true},
                    { text: "to describe the setting in detail and bring it to life for the reader", correct: false},
                    { text: "to foreshadow future events in the story", correct: false}, 
                ]
            },
            {
                question:
                    "What literary device is used in the following sentence: 'The thunderclaps came closer, echoing like the footfalls of an angry god across the vast marble pavement of the sky.'?",
                answers: [
                    { text: "Simile", correct: false},
                    { text: "Metaphor", correct: false},
                    { text: "Hyperbole", correct: true}, 
                ]
            }
        ]
    },
    {
        content: "Hegel's dialectic posits that history progresses through a series of conflicts between thesis, antithesis, and synthesis. This process leads to the gradual development of a more perfect and rational society. However, some critics argue that this view is overly deterministic and ignores the role of individual agency and historical contingency." ,
        questions: [
            {
                question:
                    "Briefly explain Hegel's theory of dialectical materialism. What are the main criticisms of this theory, and how valid do you find them?",
                answers: [
                    { text: "Hegel's dialectical materialism focuses on the material world as the driving force of history, but critics argue it ignores ideas.", correct: false},
                    { text: "Hegel's dialectic emphasizes historical contingency and individual agency, but critics find it overly idealistic.", correct: false},
                    { text: "Hegel's dialectic sees history as a series of conflicts leading to progress, but critics find it too deterministic and teleological.", correct: true}, 
                ]
            },
            {
                question:
                    "According to the passage, what is a criticism of Hegel's view of historical progress?",
                answers: [
                    { text: "History progresses through a random series of events.", correct: false},
                    { text: "Individuals have no influence on the course of history.", correct: false},
                    { text: "Historical events are unpredictable and shaped by individual choices.", correct: true}, 
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

