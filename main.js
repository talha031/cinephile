const quesionel = document.getElementById('question');
const optionel = document.getElementById('options');
const nextbtn = document.getElementById('next');
const scoreel = document.getElementById('score');
const reviewel = document.getElementById('review');
const prevBtn = document.getElementById('prev');

const quiz = [
    {
        question: "Which dish is commonly known as a classic Italian pasta?",
        options: [
            "Spaghetti Carbonara",
            "Sushi",
            "Tacos",
            "Butter Chicken"
        ],
        correct: 0
    },
    {
        question: "Which of these is a traditional Japanese dish?",
        options: [
            "Burger",
            "Ramen",
            "Pizza",
            "Biryani"
        ],
        correct: 1
    },
    {
        question: "What is the main ingredient in traditional hummus?",
        options: [
            "Rice",
            "Chickpeas",
            "Potatoes",
            "Beef"
        ],
        correct: 1
    },
    {
        question: "Which dish is famous in Pakistan?",
        options: [
            "Pasta Alfredo",
            "Biryani",
            "Sushi",
            "Taco"
        ],
        correct: 1
    },
    {
        question: "What is commonly used in a Caesar salad?",
        options: [
            "Chicken",
            "Beef",
            "Fish",
            "Pork"
        ],
        correct: 0
    },
    {
        question: "Which drink is traditionally served hot?",
        options: [
            "Iced Tea",
            "Milkshake",
            "Coffee",
            "Cold Drink"
        ],
        correct: 2
    },
    {
        question: "Which cuisine is known for sushi and ramen?",
        options: [
            "Italian",
            "Japanese",
            "Mexican",
            "Turkish"
        ],
        correct: 1
    },
    {
        question: "What is the main ingredient in pizza dough?",
        options: [
            "Corn",
            "Flour",
            "Rice",
            "Potato"
        ],
        correct: 1
    },
    {
        question: "Which dessert is made from milk and sugar?",
        options: [
            "Chips",
            "Ice Cream",
            "Salad",
            "Bread"
        ],
        correct: 1
    },
    {
        question: "Which of these is a fast food item?",
        options: [
            "Grilled Fish",
            "Steamed Rice",
            "Burger",
            "Boiled Vegetables"
        ],
        correct: 2
    }
];

let currentquestion = 0;
let score = 0;
let selected = null;
let timeleft = 60;
let timer;
let userAnswers = [];
let QuizEnded = false;
let quizStartTime = 0;
let totalTimeTaken = 0;

function loadquestion() {
    selected = null;
    optionel.innerHTML = '';
    starttimer();

    document.getElementById('progress').textContent =
        `Question ${currentquestion + 1} / ${quiz.length}`;

    const q = quiz[currentquestion];
    quesionel.innerHTML = q.question;

    q.options.forEach((opt, index) => {

        const btn = document.createElement('button');

        btn.className =
            "relative w-full h-[140px] p-6 bg-[#1c1b1b] border-4 border-zinc-700 hover:border-[#c5a059] cursor-pointer text-left transition-all duration-300 overflow-hidden";

        btn.innerHTML = `
            <span class="absolute top-4 right-4 text-3xl font-bold text-white">
                0${index + 1}
            </span>

            <div class="text-lg font-inter text-[#e9c176] mt-10">
                ${opt}
            </div>
        `;

        if (userAnswers[currentquestion] === index) {
            btn.classList.add('selected-option');
            selected = index;
        }

        btn.addEventListener('click', () => {

            selected = index;
            userAnswers[currentquestion] = index;

            optionel.querySelectorAll('button').forEach(b => {
                b.classList.remove('selected-option');
            });

            btn.classList.add('selected-option');
        });

        optionel.appendChild(btn);
    });
}
prevBtn.addEventListener('click', () => {
    if (currentquestion > 0) {
        currentquestion--;
        loadquestion();
    }
});
quizStartTime = Date.now();
loadquestion();
nextbtn.addEventListener('click', () => {
    if (selected === null) {
        alert('select an option');
        return;
    };
    
    const correct = quiz[currentquestion].correct;
    if (selected === correct) {
        score++;
    }   
        userAnswers[currentquestion] = selected;
    goNext();
})

function starttimer() {
    if(QuizEnded)
        return;
    timeleft = 60;
    document.getElementById('timer').textContent = `TIME ${timeleft}`;
    clearInterval(timer);

    timer = setInterval(() => {
        timeleft--;
        document.getElementById('timer').textContent = `TIME: 0:${timeleft}`;
        if (timeleft === 0) {
            clearInterval(timer);
            autoNext();
        }
    }, 1000)
}

function goNext() {
    currentquestion++;
    if (currentquestion < quiz.length) {
        loadquestion();
    } else {
        showScore();
    }
}

function autoNext() {
    const correctIndex = quiz[currentquestion].correct;
    const buttons = optionel.querySelectorAll('button');

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correctIndex) {
    
        }
    })
    setTimeout(() => {
        goNext();

    }, 1000);
}

function showScore() {

    totalTimeTaken = Math.floor((Date.now() - quizStartTime) / 1000);

    QuizEnded = true;
    clearInterval(timer);
    document.getElementById('progress').innerHTML = '';
    optionel.innerHTML = '';
    quesionel.innerHTML = '';
    nextbtn.style.display = 'none';
    prevBtn.style.display = 'none';
    document.getElementById('div').style.display = 'none';

    const box = document.getElementById('scorebox');

    box.style.backgroundImage = "url('book.jpg')"
   box.innerHTML = `
        <div class="bg-black/70 w-full h-full font-epilogue  flex flex-col items-center justify-center text-center p-6">

            <h1 class="text-4xl md:text-5xl  text-[#e9c176] mb-4">
                Quiz Completion
            </h1>

            <h2 class="text-5xl text-white mb-4">
                Your Score: ${score} / ${quiz.length}
            </h2>

            <p class="text-zinc-300 max-w-md">
                You have completed the Obsidian Quiz. Your knowledge has been tested across multiple levels of difficulty. Try again to improve your score and master all categories.
            </p>
             <div class="w-full flex justify-center">
            <button id="restartBtn"
                class="px-6 mt-10 py-3 bg-[#e9c176] text-black font-bold rounded hover:bg-[#c5a059] transition">
                Restart Quiz
            </button>
        </div>

        </div>
    `;
    setTimeout(() => {
    document.getElementById('restartBtn')
        .addEventListener('click', restartQuiz);
}, 0);
    showReview(); 
}

function restartQuiz(){
    currentquestion = 0;
    score = 0;
    selected = null;
    userAnswers = [];

    nextbtn.style.display = 'block';
    prevBtn.style.display = 'block'

    reviewel.innerHTML = '';

    document.getElementById('scorebox').innerHTML = '';
    document.getElementById('scorebox').style.backgroundImage = '';

    loadquestion();
}
function showReview(){

   reviewel.innerHTML = `
<div class="flex flex-col lg:flex-row w-full items-start gap-10">

    <!-- PERFORMANCE METRICS -->
    <div class="w-full lg:w-[320px] lg:min-w-[320px]rounded-sm overflow-hidden border border-[#7c6330] bg-[#181614] shadow-2xl">

        <div class="px-8 pt-8 pb-6 border-b border-[#2b2722]">
            <h2 class="text-3xl font-epilogue  text-[#e9c176]">
                Performance Metrics
            </h2>
        </div>

        <div class="px-8 py-8 space-y-8">

            <div class="flex items-center justify-between">
                <p class="text-xs tracking-[0.25em] uppercase text-zinc-500">
                    Time Taken
                </p>

                <h3 class="text-3xl font-inter text-white">
                   ${Math.floor(totalTimeTaken / 60)}:${(totalTimeTaken % 60).toString().padStart(2, '0')}
                </h3>
            </div>

            <div class="flex items-center justify-between">
                <p class="text-xs tracking-[0.25em] uppercase text-zinc-500">
                    Accuracy
                </p>

                <h3 class="text-3xl font-inter text-white">
                    ${Math.floor((score / quiz.length) * 100)}%
                </h3>
            </div>

            <div class="flex items-center justify-between">
                <p class="text-xs tracking-[0.25em] uppercase text-zinc-500">
                    Global Rank
                </p>

                <h3 class="text-3xl font-inter text-white">
                    #42
                </h3>
            </div>

        </div>
    </div>

    <div class="flex-1 px-6 ml-6">

        <h2 class="text-3xl font-epilogue  border-l-2 pl-5 border-[#d4aa5a] text-[#e9c176] mb-6 tracking-wide">
            Review Journey
        </h2>

        <div id="reviewCards" class="space-y-10"></div>

    </div>

</div>
`;

    quiz.forEach((q, index)=>{

        const userAnswer = userAnswers[index];
        const correctAnswer = q.correct;

        const div = document.createElement('div');
        div.className = "mb-6 p-4 bg-[#1c1b1b] border border-zinc-700 rounded-lg bg-zinc-900";

        let userText = "Not Answered";

        if (userAnswer !== undefined && q.options[userAnswer] !== undefined) {
            userText = q.options[userAnswer];
        }

        div.innerHTML = `
            <h3 class="text-white font-inter mb-2">
                Q${index + 1}: ${q.question}
            </h3>

            <p class="text-sm text-zinc-400">
                Your Answer:
                <span class="${
                    userAnswer === undefined
                        ? 'text-zinc-500'
                        : userAnswer === correctAnswer
                            ? 'text-[#e9c176]'
                            : 'text-red-400'
                }">
                    ${userText}
                </span>
            </p>

            <p class="text-sm text-zinc-400">
                Correct Answer:
                <span class="text-[#e9c176]">
                    ${q.options[correctAnswer]}
                </span>
            </p>
        `;

       document.getElementById('reviewCards').appendChild(div);

    });
}