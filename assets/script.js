var startButton = document.getElementById('start-btn')
var questionEl = document.getElementById('question.card')
var questionTxt= document.getElementById('question')
var answerBtn= document.getElementById('Answers')
var nextButton = document.getElementById('next-btn')
let shuffledQuestions, currentQuestionIndex
// set an array for questions and answers
var questions= [
    {
        question: 'What does HTML stand for?',
        answers: [
            {text: 'Hypertext Markup Language', correct: true},
            {text: 'Im no 100% sure', correct: false}
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers:[
            {text: 'Could you repeat the question?', correct:false},
            {text: 'Cascading Style Sheets', correct:true}
        ]
    
    },
    {
        question: 'what does the method .appendChild() do?',
        answers:[
            {text: 'I didnt quite catch that part', correct:false},
            {text: 'Adds a child element to the targeted parent', correct:true}
        ]
    
    }
    ,
    {
        question: 'How do you create a timer function?',
        answers:[
            {text: 'setInterval', correct:true},
            {text: 'Use a stopwatch', correct:false}
        ]
    
    },
    {
        question: 'Please god let this work',
        answers:[
            {text: 'This doesnt work', correct:false},
            {text: 'This does work?', correct:true}
        ]
    
    },
    {
        question: 'Ill totally remember to fill in some more actual question',
        answers:[
            {text: 'He totally wont forget', correct:false},
            {text: 'He totally will forget', correct:true}
        ]
    
    }
]





//start button element should activate startQuiz function
startButton.addEventListener('click',startQuiz)
//next button element should activate nextQuestion fuction
nextButton.addEventListener('click', nextQuestion)


//Create a function that starts the quiz
function startQuiz() {
    console.log('started')
    //hide the start button after the quiz starts
    startButton.classList.add('hide')
    //display the question
    questionEl.classList.remove('hide')
    //randomizes question array
    shuffledQuestion = questions.sort(() => Math.random()-.5)
    //sets the question index variable to 0 to start at the beginning of the array
    currentQuestionIndex=0
    //executes the set Question function
    setQuestion()
}
//Create a function that sets the question
function setQuestion () {
    //executes resetState function
    resetState()
    //executes show Question fuctions for the current index of the shuffled array
    showQuestion(shuffledQuestion[currentQuestionIndex])
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
    setQuestion()
}
//Create a function that submits selected answer
function selectAnswer (){
var selectedButton = Event.target
var correct= selectedButton.dataset.correct
setStatusClass(document.body, correct)
Array.from(answerBtn.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
})
if (shuffledQuestions.length > currentQuestionIndex +1 ){
console.log('more')
} else {
    //changes the start button to say restart and removes the hide class to make visible again
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
}
}

function setStatusClass(){
    clearStatusClass(element)
    if (correct){
    element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong') 
}
//removes previous answer buttons
function resetState(){
while (answerBtn.firstChild){
    answerBtn.removeChild (answerBtn.firstChild)
}
}