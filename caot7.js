const passages = [
    {
        content: "Once upon a time in the bustling city of Brooksville, there lived a young girl named Lily. One sunny afternoon, while playing in the park, Lily stumbled upon an old, rusty key half-buried in the dirt. Intrigued, she picked it up and examined it closely. It looked like no ordinary key she had ever seen before. Curiosity piqued, Lily decided to find out where the mysterious key belonged. She searched high and low, trying it in every lock she could find – from the gate of her house to the tiny box where she kept her treasures. But to her dismay, the key didn't fit any of them. Determined not to give up, Lily embarked on a quest to uncover the key's secret. She asked her neighbors, visited the local library, and even consulted a wise old owl who lived in the nearby woods. But no one seemed to know anything about the key or where it came from. Finally, after days of searching, Lily stumbled upon an ancient-looking door hidden behind a thicket of bushes in the park. With trembling hands, she inserted the key into the lock, holding her breath in anticipation. To her amazement, the key turned smoothly, and the door creaked open, revealing a hidden garden filled with colorful flowers and fluttering butterflies. As Lily stepped into the magical garden, she felt a sense of wonder and excitement wash over her. She realized that sometimes, the greatest adventures come from the smallest of discoveries.",
        questions: [
            {
                question:
                    "What emotions did Lily experience as she embarked on her quest to uncover the key'ssecret?",
                answers: [
                    { text: "Anger and resentment", correct: false},
                    { text: "Joy and excitement", correct: true},
                    { text: "Frustration and disappointment", correct: false},
                    { text: "Confusion and fear", correct: false},
                ]
            },
            {
                question:
                    " Why did Lily consult a wise old owl during her search for the key's origin?",
                answers: [
                    { text: "Because the owl was known for its wisdom and knowledge of the city", correct: true},
                    { text: "Because the owl had a special connection to the park where Lily found the key", correct: false},
                    { text: "Because Lily believed in the magical abilities of owls to reveal secrets", correct: false},
                    { text: "Because Lily had seen the owl talking to other animals and thought it could help her", correct: false},
                ]
            },
            {
                question:
                    "How did Lily finally locate the hidden door in the park?",
                answers: [
                    { text: "She followed a trail of breadcrumbs left by the wise old owl", correct: false},
                    { text: "She stumbled upon it while exploring the park's dense foliage", correct: true},
                    { text: "She used a map given to her by a mysterious stranger", correct: false},
                    { text: "She deciphered a riddle written on the back of the key", correct: false},
                ]
            },
            {
                question:
                    "What lesson did Lily learn from her adventure with the lost key?",
                answers: [
                    { text: "That magical creatures are real and can help in times of need", correct: false},
                    { text: "That secrets are meant to stay hidden and should not be uncovered", correct: false},
                    { text: "That exploring unfamiliar places can be dangerous and should be avoided", correct: false},
                    { text: "That patience and perseverance are key to solving mysteries", correct: true},
                ]
            },
            {
                question:
                    "How would the discovery of the hidden garden change Lily's perception of the world aroundher?",
                answers: [
                    { text: "She will become more cautious and wary of her surroundings", correct: false},
                    { text: "She will become more skeptical and disbelieving of fantastical stories", correct: false},
                    { text: "She will become more adventurous and open to new experiences", correct: true},
                    { text: "She will become more isolated and withdrawn, preferring solitude to company", correct: false},
                ]
            }
        ]
    },
    {
        content: "In the quaint village of Willowbrook, there lived a young boy named Ethan who had always dreamt of adventure. One day, while exploring the attic of his grandfather's house, Ethan stumbled upon an old, tarnished compass hidden beneath a pile of dusty books. Intrigued by its ancient appearance, he carefully wiped away the grime to reveal intricate engravings and shimmering gemstones embedded in its surface. Excited by his discovery, Ethan decided to test the compass's powers. Holding it in his hand, he whispered, 'Show me the path to adventure.' To his amazement, the needle began to spin wildly before settling on a direction that pointed towards the dense forest at the edge of the village. Determined to uncover the secrets of the enchanted compass, Ethan ventured into the forest, his heart pounding with excitement. As he trekked deeper into the woods, he encountered all manner of magical creatures – from mischievous sprites to gentle forest nymphs. Just as Ethan began to feel lost, the compass led him to a hidden glade bathed in golden sunlight. At the center of the glade stood a majestic oak tree, its branches reaching towards the sky like outstretched arms. Beneath the tree lay a chest adorned with intricate carvings. With trembling hands, Ethan opened the chest to reveal a map that shimmered with ethereal light. It depicted a land of endless possibilities and untold treasures, waiting to be discovered by those brave enough to seek them. As Ethan gazed upon the map, he realized that his adventure was just beginning. With the enchanted compass as his guide, he set off into the unknown, eager to explore the wonders that awaited him.",
        questions: [
            {
                question:
                    " How did Ethan discover the enchanted compass?",
                answers: [
                    { text: "He found it in the village market", correct: false},
                    { text: "He received it as a gift from his grandfather", correct: false},
                    { text: "He stumbled upon it in the attic", correct: true},
                    { text: ") He bought it from a mysterious traveler", correct: false},
                ]
            },
            {
                question:
                    "What did Ethan say to activate the compass's powers?",
                answers: [
                    { text: "Lead me to treasure", correct: false},
                    { text: "Show me the path to adventure", correct: true},
                    { text: "Show me the way home", correct: false},
                    { text: "Reveal the secrets", correct: false},
                ]
            },
            {
                question:
                    "Where did the compass lead Ethan?",
                answers: [
                    { text: "To the mountains", correct: false},
                    { text: "To the sea", correct: false},
                    { text: "To the forest", correct: true},
                    { text: "To the desert", correct: false},
                ]
            },
            {
                question:
                    "What did Ethan find beneath the majestic oak tree?",
                answers: [
                    { text: "A chest filled with gold coins", correct: false},
                    { text: "A magical potion that can give him superpowers", correct: false},
                    { text: "A map shimmering with ethereal light inside a chest", correct: true},
                    { text: "A powerful wand that can summon spirits", correct: false},
                ]
            },  
            {
                question:
                    "How did Ethan feel as he set off into the unknown with the enchanted compass?",
                answers: [
                    { text: "Excited and eager", correct: true},
                    { text: "Anxious and afraid", correct: false},
                    { text: "Doubtful and uncertain", correct: false},
                    { text: "Reluctant and hesitant", correct: false},
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
    let questionNo = currentQuestionIndex < 5 ? currentQuestionIndex + 1 : "1." + (currentQuestionIndex - 1);
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
