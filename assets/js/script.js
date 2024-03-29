// questions to be displayed
const questions = [
    {
        question: "Can you name the capital of France?",
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
        question: "Which river flows through London?",
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
        question: "How many countries are there in the world?",
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
const restart = document.getElementById("restart-question");
const timerElement = document.getElementById("timer");
const askClue = document.getElementById("clue-question");

// question number and score tracker
let questionNumber = 0;
let score = 0;
let timerTime;
let timerInterval;

// initiallises quiz
beginQuiz();

// main function to start quiz when page is opened
function beginQuiz() {
    loadQuestion();
}

// function to load next question
function loadQuestion() {
    document.getElementById("progressFull").style.display = 'block';
    document.getElementById("progressBar").style.display = 'block';
    nextQuestion.style.display = 'block';
    document.getElementById("timer").style.display = 'block';
    document.getElementById("clue-question").style.display = 'block';
    clearQuestion();
    resetTimer();
    startTimer();
    let presentQuestion = questions[questionNumber];
    let questionNum = questionNumber + 1;
    questionText.innerHTML = "Question " + questionNum + " / " + questions.length + " - " + presentQuestion.question;
    document.getElementById("progressFull").style.width = `${(questionNum / questions.length) * 100}%`;
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
//  Add click event listener for clue button
         askClue.addEventListener("click", () => {
         giveclue();
    });
}
// function to clear the previous question
    function clearQuestion() {
        nextQuestion.disabled = true;
        askClue.disabled = false;
        while (questionAnswer.firstChild) {
            questionAnswer.removeChild(questionAnswer.firstChild);
        }

    }

    //function to choose answer
    function chooseAnswer(e) {
        stopTimer();
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
        nextQuestion.disabled = false;
        restart.disabled = false;
        askClue.disabled = true;
    }

    //function to show scores at end of quiz
    function scoreResults() {
        clearQuestion();
        questionText.innerHTML = `you scored ${score} out of ${questions.length}! If you wish to try again 
  press the restart button.`;
        questionText.style.textAlign = "center";
    }

    // function to show next button after question is pressed, display score if question number is the same as.
    function displaybutton() {
        questionNumber++;
        if (questionNumber < questions.length) {
            loadQuestion();
        } else {
            stopTimer();
            scoreResults();
            document.getElementById("progressFull").style.display = 'none';
            document.getElementById("progressBar").style.display = 'none';
            nextQuestion.style.display = 'none';
            document.getElementById("timer").style.display = 'none';
            document.getElementById("clue-question").style.display = 'none';
            questionText.style.textAlign = "center";
        }
    }

    // gets user the next question when next is clicked
    nextQuestion.addEventListener("click", () => {
        displaybutton();
    });

// Function to give the users a clue to show one wrong answer
function giveclue() {
    const incorrectButtons = Array.from(questionAnswer.children).filter(button => button.dataset.correct !== "true");
    if (incorrectButtons.length > 0) {
        const randomIndex = Math.floor(Math.random() * incorrectButtons.length);
        const randomIncorrectButton = incorrectButtons[randomIndex];
        // Remove the "incorrect" class from all incorrect buttons
        incorrectButtons.forEach(button => {
            button.classList.remove("incorrect");
            button.disabled = false;
        });
        // Add the "incorrect" class only to the randomly chosen incorrect button
        randomIncorrectButton.classList.add("incorrect");
        randomIncorrectButton.disabled = true;
        askClue.disabled = true;
    }
}

    restart.addEventListener("click", restartQuiz);

    function restartQuiz() {
        questionNumber = -1;
        score = 0;
        stopTimer();
        displaybutton();
    }

    // Timer functions
    function startTimer() {
        timerTime = 10;
        updateTimer();
        timerInterval = setInterval(timerTick, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function resetTimer() {
        timerElement.innerText = "10";
    }

    function timerTick() {
        if (timerTime > 0) {
            timerTime--;
            updateTimer();
        } else {
            stopTimer();
            displaybutton();
        }

    }

    function updateTimer() {
        const roundedTime = Math.round(timerTime);
        timerElement.innerText = roundedTime;
    }