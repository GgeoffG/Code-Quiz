var startButton = document.getElementById('start-btn')
var questionEl = document.getElementById('question.card')
var questionTxt= document.getElementById('question')
var answerBtn= document.getElementById('Answers')
var nextButton = document.getElementById('next-button')
var scoreEl= document.getElementById('score')
var scoreDis=document.getElementById('scoreDis')
var score= 0

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
        question: 'Please god let this work',
        answers:[
            {text: 'This doesnt work', correct:false},
            {text: 'This does work?', correct:true},
        ]
    
    },
    {
        question: 'Ill totally remember to fill in some more actual question',
        answers:[
            {text: 'He totally wont forget', correct:false},
            {text: 'He totally will forget', correct:true},
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
    }
    if (shuffledQuestions.length > currentQuestionIndex +1){
        nextButton.classList.remove('hide')
    }
    else{
        startButton.classList.remove('hide')
        scoreEl.classList.remove('hide')
    }
    scoreDis.innerText= Math.floor((score/questions.length) * 100) + '%'
}


//removes previous answer buttons
function resetState(){
while (answerBtn.firstChild){
    answerBtn.removeChild (answerBtn.firstChild)
}
}

function clearStorage(){
    localStorage.clear()
    score=0
}

clearStorage()