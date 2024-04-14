const questions = [
    {
        question:[
            "Serene", //word
            "Which sentence uses the word ‘chutney’ correctly?", //question
        ],
        answers: [
            { text: "The bustling city was serene with activity.", correct: false}, 
            { text: "The raging storm caused a serene atmosphere.", correct: false},
            { text: "As she sat by the peaceful lake, she felt a sense of serenity wash over her.", correct: true},
            { text: "Jane felt very serene when a rabid dog attacked her.", correct: false},
        ]
    },
{
question:[
            "Inane", //word
            "Which sentence uses the word ‘inane’ correctly?", //question
        ],
        answers: [
            { text: "The professor's lecture was inane, providing insightful information on the topic.", correct: false}, 
            { text: "The inane novel delved into complex societal issues, leaving readers deeply moved.", correct: false},
            { text: "The inane article provided insightful analysis on the current political climate.", correct: false},
            { text: "The inane banter between the characters detracted from the seriousness of the film's plot.", correct: true},
        ]
    },
{
        question:[
            "Implore", //word
            "Which sentence uses the word ‘implore’ correctly?", //question
        ],
        answers: [
            { text: "The mother implored the doctor to save her son's life, as he lay unconscious in the emergency room.", correct: true}, 
            { text: "She implored him with a smile on her face, expressing her gratitude.", correct: false},
            { text: "The student implored the teacher for an extension, having plenty of time to complete the assignment.", correct: false},
            { text: "The team implored their coach for winning the game.", correct: false},
        ]
    },
    {
        question:[
            "Prolific", //word
            "Which sentence uses the word ‘prolific’ correctly?", //question
        ],
        answers: [
            { text: "She was prolific on her writings, publishing very few books.", correct: false}, 
            { text: "The author was prolific in her output, publishing several novels each year.", correct: true},
            { text: "She was prolific in her in gardening, growing only few types of flowers.", correct: false},
            { text: "He was a prolific of novels, writing a total of 3 books in his lifetime.", correct: false},
        ]
    },
    {
        question:[
            "Opulent", //word
            "Which sentence uses the word ‘opulent’ correctly?", //question
        ],
        answers: [
            { text: "He lived in an opulent house, furnished with cheap decor.", correct: false}, 
            { text: "The opulent palace, with its gilded walls and velvet curtains, was a symbol of extravagance and wealth.", correct: true},
            { text: "The opulent, adorned with jewels, queen lived in palace.", correct: false},
            { text: "The coach cheered for winning opulent game.", correct: false},
        ]
    },
    {
question:[
            "Perplex", //word
            "Which sentence uses the word ‘perplex’ correctly?", //question
        ],
        answers: [
            { text: "The perplex student, unable to understand the concept, sought help from the teacher.", correct: false}, 
            { text: "Perplexed by the straightforward instructions, he successfully assembled the furniture.", correct: false},
            { text: "Her perplex expression indicated that she understood the situation perfectly.", correct: false},
            { text: "The perplex situation, with its conflicting information, left everyone confused.", correct: true},
        ]
    },
{
        question:[
            "Contemplate", //word
            "Which sentence uses the word ‘contemplate’ correctly?", //question
        ],
        answers: [
            { text: "Contemplate the stunning view, a sense of tranquility washed over him.", correct: false}, 
            { text: "The contemplate man, lost in thought, pondered his next move.", correct: false},
            { text: "While contemplating his future, he realized the importance of making thoughtful decisions.", correct: true},
            { text: "Contemplate by the vastness of the universe, he felt small and insignificant.", correct: false},
        ]
    },
    {
question:[
            "Aspire", //word
            "Which sentence uses the word ‘aspire’ correctly?", //question
        ],
        answers: [
            { text: "Aspiring to be a great leader, she dedicated herself to continuous self-improvement.", correct: true}, 
            { text: "The aspire student, dreaming of success, worked tirelessly towards their goals.", correct: false},
            { text: "Aspire by the achievements of her role models, she strived for greatness.", correct: false},
            { text: "Aspired by the success of her peers, she worked hard to achieve her goals.", correct: false},
        ]
    },
{
        question:[
            "Baleful", //word
            "Which sentence uses the word ‘baleful’ correctly?", //question
        ],
        answers: [
            { text: "The baleful nature of the storm, with its dark clouds, raged across the countryside.", correct: true}, 
            { text: "Baleful of the consequences, he proceeded with caution.", correct: false},
            { text: "Baleful with anger, he stormed out of the room.", correct: false},
            { text: "The baleful of the situation, she felt a sense of dread.", correct: false},
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
