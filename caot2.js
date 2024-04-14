const passages = [
    {
        content: "Mount Everest, the highest peak on Earth, stands majestically in the Himalayas, straddling the border between Nepal and China. Rising to a breathtaking height of 8,848 meters above sea level, it has long captured the imagination of adventurers and mountaineers. Despite its awe-inspiring beauty, Everest poses significant challenges to those who attempt to summit it, including treacherous weather conditions and extreme altitude sickness. Nevertheless, each year, climbers from around the world embark on the perilous journey to conquer this iconic peak, seeking the ultimate test of human endurance and resilience.",
        questions: [
            {
                question:
                    "Where is Mount Everest located, and what is its significance?",
                answers: [
                    { text: "China,  it captures the imagination of adventurers and mountaineers", correct: false},
                    { text: "Nepal, serves as the ultimate test of human endurance and resilience for adventurers and mountaineers.", correct: false},
                    { text: "Himalayas, it is  known as the highest peak on Earth", correct: true},
                ]
            },
            {
                question:
                    "What are some of the challenges faced by climbers attempting to summit Mount Everest?",
                answers: [
                    { text: "Avalanche and frostbite", correct: false},
                    { text: "Fevers and Vomiting", correct: false},
                    { text: "Extreme treacherous weather conditions and altitude sickness", correct: true},
                ]
            }
        ]
    },
    {
        content: "The Amazon Rainforest, often referred to as the 'lungs of the Earth,' plays a crucial role in regulating the planet's climate and biodiversity. Spanning nine countries in South America, it is the largest tropical rainforest in the world, covering an area of over 5.5 million square kilometers. Home to countless species of plants and animals, many of which are found nowhere else on Earth, the Amazon is a treasure trove of biodiversity. However, rampant deforestation, primarily driven by agriculture and logging, poses a grave threat to this vital ecosystem.",
        questions: [
            {
                question:
                    "Why is the Amazon Rainforest often called the 'lungs of the Earth'",
                answers: [
                    { text: "Because it plays a crucial role in sheltering countless species of plants and animals", correct: false},
                    { text: "Because it plays a crucial role in regulating the planet's climate and biodiversity", correct: true},
                    { text: "Because it plays a crucial role in being the treasure trove of biodiversity", correct: false},
                ]
            },
            {
                question:
                    "What are the main causes of deforestation in the Amazon?",
                answers: [
                    { text: "Mining and Forest fires ", correct: false},
                    { text: "The growing Agriculture and Loggings", correct: true},
                    { text: "Soil erosion and Climate Change", correct: false},
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

