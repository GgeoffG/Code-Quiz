var startButton = document.getElementById('start-btn')
var questionEl = document.getElementById('question.card')
var questionTxt= document.getElementById('question')
var answerBtn= document.getElementById('Answers')
var nextButton = document.getElementById('next-button')
var scoreEl= document.getElementById('score')
var scoreDis=document.getElementById('scoreDis')
var lastScore=document.getElementById('lastScore')
var submit=document.getElementById('submit')
var score= 0
var scoreKeeperEl=document.getElementById('scoreKeeperEl')
var h1=document.getElementById('time')
let IntervalId
let timercount
// set an array for questions and answers
var questions= [
    {
        question: 'What does HTML stand for?',
        answers: [
            {text: 'Hypertext Markup Language', correct: true},
            {text: 'Im not 100% sure', correct: false},
            {text: 'Home Telemark Locator', correct: false},
            {text: 'None of the above', correct:false},
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers:[
            {text: 'Could you repeat the question?', correct:false},
            {text: 'Cascading Style Sheets', correct:true},
            {text: 'Color Size and Scope', correct:false},
            {text: 'Collapsible Style Storage', correct:false},

        ]
    
    },
    {
        question: 'what does the method .appendChild() do?',
        answers:[
            {text: 'I didnt quite catch that part', correct:false},
            {text: 'Adds a child element to the targeted parent', correct:true},
            {text: 'Removes a child element from the trageted parent', correct:false},
            {text: 'Creates an element as the child of the targeted parent', correct:false},
        ]
    
    }
    ,
    {
        question: 'How do you create a timer function?',
        answers:[
            {text: 'setInterval()', correct:true},
            {text: 'Use a stopwatch', correct:false},
            {text: 'intervalSet()', correct:false},
            {text: 'timer.create()', correct:false},
        ]
    
    },
    {
        question: 'Coding is fun',
        answers:[
            {text: 'False', correct:false},
            {text: 'True', correct:true},
        ]
    
    },
    {
        question: 'The DOM refers to a family tree like structure that is used to traverse your CSS page',
        answers:[
            {text: 'True', correct:false},
            {text: 'False', correct:true},
        ]
    
    }
]


let shuffledQuestions =  questions.sort(() => Math.random()-.5)
let currentQuestionIndex = 0

//start button element should activate startQuiz function
startButton.addEventListener('click',startQuiz)
//next button element should activate nextQuestion fuction
nextButton.addEventListener('click', nextQuestion)


//Create a function that starts the quiz
function startQuiz() {
    console.log('started')
    if (startButton.innerText == 'Try Again'|| startButton.innerText == 'Restart'){
       location.reload() 
    }
    clearStorage()
    //hide the start button after the quiz starts
    startButton.classList.add('hide')
    //display the question
    questionEl.classList.remove('hide')
    //nextButton.classList.remove('hide')
    //randomizes question array
     shuffledQuestions = questions.sort(() => Math.random()-.5)
    //sets the question index variable to 0 to start at the beginning of the array
    currentQuestionIndex=0
    //executes the set Question function
    setQuestion()
    nextButton.disabled=true
    scoreEl.classList.add('hide')
    timercount=100
    h1.innerText=timercount + ' seconds left'
    IntervalId=setInterval(timer,1000)
    
    
    
}
//Create a function that sets the question
function setQuestion () {
    //executes resetState function
    resetState()
    //executes show Question fuctions for the current index of the shuffled array
    showQuestion(shuffledQuestions[currentQuestionIndex])
}
//select question from array
function showQuestion(question) {
questionTxt.innerText = question.question
//creates a loop to create a new button for each answer available
question.answers.forEach(answer => {
    //creation variable
    const button =document.createElement('button')
    //set text to answer text from array
    button.innerText= answer.text
    //adds the btn class to the created buttons
    button.classList.add('btn')
    //gives a dataset attribute of correct to the correct answer
   if (answer.correct){
      button.dataset.correct = answer.correct
    }
   //applies the select answer function to the created buttons
    button.addEventListener('click', selectAnswer)
    //adds the button to the button grid
    answerBtn.appendChild(button)

})
}
//function to cycle through questions
function nextQuestion(){
    //changes index and then run the set question function for the new index
    currentQuestionIndex++
    nextButton.classList.add('hide')
    setQuestion()
    if (shuffledQuestions.length > currentQuestionIndex +1 ){
    setQuestion()
    }else{
    startButton.innerText = 'Restart'
    //startButton.classList.remove('hide')
    
    //scoreEl.classList.remove('hide')
    
    }
}
//Create a function that submits selected answer
function selectAnswer (event){
var selectedButton = event.target
var correct= selectedButton.dataset.correct
nextButton.disabled=false
Array.from(answerBtn.children).forEach(button => {
    button.classList.remove('correct')
    button.classList.remove('wrong') 
       // if(button !== event.target)
    button.disabled=true
})
if (correct){
    selectedButton.classList.add('correct'),
    score++
    localStorage.setItem('score',score)
    score=localStorage.getItem('score',score)
    } else {
        selectedButton.classList.add('wrong')
        h1.classList.add('wrong')
       timercount= timercount -5
       h1.innerHTML=timercount + ' seconds left'
    }
    if (shuffledQuestions.length > currentQuestionIndex +1){
        nextButton.classList.remove('hide')
    }
    else{
        scoreKeeperEl.classList.remove('hide')
        startButton.classList.remove('hide')
        scoreEl.classList.remove('hide')
        h1.classList.remove('wrong')
        clearInterval(IntervalId)
        h1.innerText = "Congratulations!"

    }
    var getInt= localStorage.getItem('saved initials',inInput)
    var getScore= localStorage.getItem('saved score',Math.floor((score/questions.length) * 100) + '%')
    scoreDis.innerText= Math.floor((score/questions.length) * 100) + '%'
    if(getInt && getScore){
    lastScore.innerText= getInt + ':'+' ' + getScore
    }
    else {
        lastScore.innerText='Save your score to compare next time!'
    }
}


//removes previous answer buttons
function resetState(){
while (answerBtn.firstChild){
    answerBtn.removeChild (answerBtn.firstChild)
}
}

function clearStorage(){
    score = 0
    localStorage.setItem('score',score)
}

clearStorage()

function timer() {
    if (timercount > 0)
        timercount--
        h1.classList.remove('wrong')
    h1.innerText = timercount + ' seconds left'
    if (timercount === 0) {
        h1.innerText = "Gameover!"
        Array.from(answerBtn.children).forEach(button => {
            button.classList.remove('correct')
            button.classList.remove('wrong')
            button.disabled = true
            startButton.innerText = 'Try Again'
            startButton.classList.remove('hide')
        }
        )
    }
} 

const scoreKeep = (ev)=>{
    ev.preventDefault()
    localStorage.setItem('saved score',Math.floor((score/questions.length) * 100) + '%')
    inInput=document.getElementById('inInput').value
    localStorage.setItem('saved initials', inInput)
    location.reload()
}
submit.addEventListener('click',scoreKeep)