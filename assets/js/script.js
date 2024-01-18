// questions to be displayed
const questions = [
    {
        question: "What is the capital of France?",
        choices: [
            { text: "Paris", correct: true },
            { text: "Rome", correct: false },
            { text: "London", correct: false },
            { text: "Sydney", correct: false },
        ]
    },
    {
        question: "How tall is mount Everest in metres?",
        choices: [
            { text: "8849", correct: true },
            { text: "10543", correct: false },
            { text: "5673", correct: false },
            { text: "7695", correct: false },
        ]
    },
    {
        question: "What is the name of the river that flows through London?",
        choices: [
            { text: "River Mersey", correct: false },
            { text: "River Dee", correct: false },
            { text: "River Tyne", correct: false },
            { text: "River Thames", correct: true },
        ]
    },
    {
        question: "In which US state can you find the city of Chicago?",
        choices: [
            { text: "Illinois", correct: true },
            { text: "Mississipi", correct: false },
            { text: "Missouri", correct: false },
            { text: "Arizona", correct: false },
        ]
    },
    {
        question: "How many countries are their in the world?",
        choices: [
            { text: "105", correct: false },
            { text: "145", correct: false },
            { text: "195", correct: true },
            { text: "245", correct: false },
        ]
    },
    {
        question: "Which European city is not located on the Danube?",
        choices: [
            { text: "Budapest", correct: false },
            { text: "Prague", correct: true },
            { text: "Vienna", correct: false },
            { text: "Belgrade", correct: false },
        ]
    },
    {
        question: "What is the highest mountain in Japan?",
        choices: [
            { text: "Mount Aino", correct: false },
            { text: "Mount Kita", correct: false },
            { text: "Mount Fuji", correct: true },
            { text: "Mount Okuhotaka", correct: false },
        ]
    },
    {
        question: "What is the smallest country in the world?",
        choices: [
            { text: "Andorra", correct: false },
            { text: "Luxembourg", correct: false },
            { text: "Belgium", correct: false },
            { text: "Vatican City", correct: true },
        ]
    },
    {
        question: "What is the capital of the United Arab Emirates?",
        choices: [
            { text: "Ajman", correct: false },
            { text: "Sharjah", correct: false },
            { text: "Dubai", correct: false },
            { text: "Abu Dhabi", correct: true },
        ]
    },
    {
        question: "On which continent is the Sahara desert located?",
        choices: [
            { text: "Europe", correct: false },
            { text: "South America", correct: false },
            { text: "Africa", correct: true },
            { text: "Asia", correct: false },
        ]
    },
    {
        question: "Which country is the most north on a globe?",
        choices: [
            { text: "Netherlands", correct: false },
            { text: "Scotland", correct: true },
            { text: "Belgium", correct: false },
            { text: "Poland", correct: false },
        ]
    }
];

// assigned variables to html elements

const questionText = document.getElementById("questiondisplay");
const questionAnswer = document.getElementById("questionanswers");
const nextQuestion = document.getElementById("next-question");

// question number and score tracker

let questionNumber = 0;
let score = 0;

// initiallises quiz
beginQuiz();

// main function to start quiz when page is opened
function beginQuiz() {
    loadQuestion();
}

// function to load next question

function loadQuestion() {
    clearQuestion();
    let presentQuestion = questions[questionNumber];
    let questionNum = questionNumber + 1;
    questionText.innerHTML = "Question " + questionNum + " / " + questions.length + " - " + presentQuestion.question;
    presentQuestion.choices.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("answerbuttons");
        questionAnswer.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", chooseAnswer);
    });

}
// function to clear the previous question

function clearQuestion() {
    nextQuestion.style.display = 'none';
    while (questionAnswer.firstChild) {
        questionAnswer.removeChild(questionAnswer.firstChild);
    }

}

//function to choose answer
function chooseAnswer(e) {
    const chosenAnswer = e.target;
    const chooseright = chosenAnswer.dataset.correct === "true";
    if (chooseright) {
        chosenAnswer.classList.add("correct");
        score++;
    }
    else {
        chosenAnswer.classList.add("incorrect");
    }
    Array.from(questionAnswer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    nextQuestion.style.display = "block";
}




//function to show scores at end of quiz
function scoreResults() {
    clearQuestion();
    questionText.innerHTML = `you scored ${score} out of ${questions.length}!`;
}

// function to show next button after question is pressed, display score if question number is the same as.
function displaybutton() {
    questionNumber++;
    if (questionNumber < questions.length) {
        loadQuestion();
    } else {
        scoreResults();
    }
}

// gets user the next question when next is clicked
nextQuestion.addEventListener("click", () => {
    if (questionNumber < questions.length) {
        displaybutton();
    } else {
    }


});