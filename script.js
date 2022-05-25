import {data} from'./data.js'

let questions=data.questions
const finishButton = document.getElementById('finish-btn')
const nextButton = document.getElementById('next-btn')

const Question10StartButton = document.getElementById('10QuestionStart-btn')
const Question20StartButton = document.getElementById('20QuestionStart-btn')
const Question30StartButton = document.getElementById('30QuestionStart-btn')
const Question50StartButton = document.getElementById('50QuestionStart-btn')
const AllQuestionStart = document.getElementById('AllQuestionStart-btn')

const loginBtn = document.getElementById('logbtn')
const inputClassTxt = document.getElementById('inputClassTxt');
const inputClassPw = document.getElementById('inputClassPw');
const alertBoxID = document.getElementById('alertBoxID');
const alertBox_X_btn = document.getElementById('alertBox_X_btn');

const SuccessRate = document.getElementById('SuccessRate');
const SuccessRate1 = document.getElementById('SuccessRate1');
const SuccessRate2 = document.getElementById('SuccessRate2');
const SuccessRate3 = document.getElementById('SuccessRate3');
const SuccessRate4 = document.getElementById('SuccessRate4');
const SuccessRate5 = document.getElementById('SuccessRate5');
const maintTitle = document.getElementById('mainTitleEl')
const questionElement = document.getElementById('question')
const answeButtonsElement = document.getElementById('answer-buttons')
const scoreElement = document.getElementById('scoreID')

const scoreFailItem = document.getElementById('failItemsID')
const scoreSuccesItem = document.getElementById('successItemsID')
const resultsItem = document.getElementById('resuldsID')
const timerElement = document.getElementById('timer')
const questionContainerElement = document.getElementById('question-container')
let shuffledQuestions
let currentQuestionIndex

var currentSuccessPoints = 0
var currentFailedPoints = 0

var sec = 0;
var min = 0;
var hours = 0;
var timer

var SuccessRateArray = [];
SuccessRateArray.push(SuccessRate1)
SuccessRateArray.push(SuccessRate2)
SuccessRateArray.push(SuccessRate3)
SuccessRateArray.push(SuccessRate4)
SuccessRateArray.push(SuccessRate5)


loginBtn.addEventListener('click', loginMth)
alertBox_X_btn.addEventListener('click', closeAlertMthd)





if (finishButton) {
    finishButton.addEventListener('click', endGame)
}

if (Question10StartButton) {
    Question10StartButton.addEventListener('click', () => {
        startGame(Question10StartButton)
    })
}

if (Question20StartButton) {
    Question20StartButton.addEventListener('click', () => {
        startGame(Question20StartButton)
    })

}
if (Question30StartButton) {
    Question30StartButton.addEventListener('click', () => {
        startGame(Question30StartButton)
    })
}
if (Question50StartButton) {
    Question50StartButton.addEventListener('click', () => {
        startGame(Question50StartButton)
    })
}

if (AllQuestionStart) {
    AllQuestionStart.addEventListener('click', () => {
        startGame(AllQuestionStart)
    })
}

if (nextButton) {
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++
        setNextQuestion()
    })
}



function loginMth() {

    let User = inputClassTxt.value
    let pw = inputClassPw.value

    // if (User == "Failed" && pw == "Correct") {
    if (true) {
        Question10StartButton.classList.remove('hide')
        Question20StartButton.classList.remove('hide')
        Question30StartButton.classList.remove('hide')
        Question50StartButton.classList.remove('hide')
        AllQuestionStart.classList.remove('hide')

        loginBtn.classList.add('hide')
        inputClassTxt.classList.add('hide')
        inputClassPw.classList.add('hide')
    } else {
        //Open AlertBox
        alertBoxID.classList.remove('hide')

    }

}
//Close AlertBox
function closeAlertMthd() {
    alertBoxID.classList.add('hide')
}



function startGame(e) {
    //  //console.log(e.id)
    sec = 0;
    min = 0;
    hours = 0;


    timerElement.innerText = "Time: " + hours + "h " + min + "m " + sec + "s"

    timer = setInterval(function () {

        timerElement.innerText = "Time: " + hours + "h " + min + "m " + sec + "s"

        if (sec >= 59) {
            sec = 0;
            min = min + 1

        } if (min >= 59) {
            hours = hours + 1
            min = 0;
        }
        sec++;
    }, 1000)

    shuffledQuestions = questions.sort(() => Math.random() - .5)
    var TotalArrayLength = shuffledQuestions.length
    var ToBeRemoved

    if (e.id == "10QuestionStart-btn") {
        ToBeRemoved = TotalArrayLength - 10 //1978 -10
        shuffledQuestions = shuffledQuestions.slice(ToBeRemoved)
        maintTitle.innerText = "Test with 10 Questions!"
    }

    if (e.id == "20QuestionStart-btn") {

        ToBeRemoved = TotalArrayLength - 20 //1978 -20
        shuffledQuestions = shuffledQuestions.slice(ToBeRemoved)
        maintTitle.innerText = "Test with 20 Questions!"
    }
    if (e.id == "30QuestionStart-btn") {
        ToBeRemoved = TotalArrayLength - 30 //1978 -30
        shuffledQuestions = shuffledQuestions.slice(ToBeRemoved)
        maintTitle.innerText = "Test with 30 Questions!"
    }
    if (e.id == "50QuestionStart-btn") {
        ToBeRemoved = TotalArrayLength - 50 //1978 -50
        shuffledQuestions = shuffledQuestions.slice(ToBeRemoved)
        maintTitle.innerText = "Test with 50 Questions!"
    }
    if (e.id == "AllQuestionStart-btn") {
        maintTitle.innerText = "Test All Questions!"
    }

    finishButton.classList.add('hide')
    Question10StartButton.classList.add('hide')
    Question20StartButton.classList.add('hide')
    Question30StartButton.classList.add('hide')
    Question50StartButton.classList.add('hide')
    AllQuestionStart.classList.add('hide')



    currentQuestionIndex = 0

    questionContainerElement.classList.remove('hide')
    currentSuccessPoints = 0
    currentFailedPoints = 0

    setNextQuestion()
}


function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

var questionTxt
function showQuestion(question) {

    questionTxt = question.questions

    //Show Success Rate
    //Show Success Rate
    var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
    var obj = oldItems.find(o => o.Question === questionTxt);


    //Remove Red/Green/Neutral Colors
    for (var s = 0; s <= SuccessRateArray.length - 1; s++) {

        SuccessRateArray[s].classList.remove('green')
        SuccessRateArray[s].classList.remove('red')
        SuccessRateArray[s].classList.add('neutralcircleColor')
    }

    if (obj != null) {
        for (let i = 0; i < obj.LastExecutions.length; i++) {

            if (i >= 5) {
                break;
            }



            if (obj.LastExecutions[i] === false) {
                console.log("red", i)


                SuccessRateArray[i].classList.remove('neutralcircleColor')

                SuccessRateArray[i].classList.add('red')
                console.log(SuccessRateArray[i])
            } else {

                console.log("green", i)
                SuccessRateArray[i].classList.remove('neutralcircleColor')

                SuccessRateArray[i].classList.add('green')
                console.log(SuccessRateArray[i])
            }

        }


        //SuccessRate.innerText = obj.LastExecutions
    } else {
        //SuccessRate1.classList.add('neutralcircleColor')

        for (var s = 0; s <= SuccessRateArray.length - 1; s++) {
            SuccessRateArray[s].classList.remove('green')
            SuccessRateArray[s].classList.remove('red')
            SuccessRateArray[s].classList.remove('neutralcircleColor')
        }
    }

    questionElement.innerText = question.questions

    var calculatedIndex = currentQuestionIndex + 1
    scoreElement.innerText = "Executing: " + calculatedIndex + " of " + shuffledQuestions.length
    scoreElement.classList.remove('hide')
    scoreSuccesItem.classList.remove('hide')
    scoreFailItem.classList.remove('hide')
    resultsItem.classList.remove('hide');
    scoreSuccesItem.innerText = "Correct: " + currentSuccessPoints
    scoreFailItem.innerText = "Failed: " + currentFailedPoints





    question.answers.forEach(answer => {

        const buttonAnswers = document.createElement('buttonAnswer')
        buttonAnswers.innerText = answer.text
        buttonAnswers.classList.add('btn')


        if (answer.correct) {

            buttonAnswers.dataset.correct = answer.correct
        }
        buttonAnswers.addEventListener('click', selectAnswer)
        answeButtonsElement.appendChild(buttonAnswers)
    });
}
function resetState() {
    // clearStatatusClass(document.body)
    nextButton.classList.add('hide')
    while (answeButtonsElement.firstChild) {
        answeButtonsElement.removeChild(answeButtonsElement.firstChild)
    }

}
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    //setStatusClass(document.body, correct)

    Array.from(answeButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
        button.classList.add('disabled')

    })


    var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
    //console.log("OLD ITeMS", oldItems)
    //check at Local Storage if it exists
    let obj = oldItems.find(o => o.Question === questionTxt);
    //console.log("obj", obj)

    //localStorage.removeItem('myArray')
    //Correct Answer
    if (correct) {

        //If item not exist add it
        if (obj == null) {
            //console.log("New Item", obj)
            var newItem = {
                'Question': questionTxt,
                'LastExecutions': [true]
            }
            //Append Changes to LocalStorage
            oldItems.push(newItem);
            localStorage.setItem('itemsArray', JSON.stringify(oldItems));
        } else {

            //mark as Executed by adding to index 0 true/False
            obj.LastExecutions.splice(0, 0, true)

            // //console.log("Updated: ",obj)

            //remove found obj from oldItems
            var index = oldItems.indexOf(obj)
            if (index !== -1) {
                oldItems.splice(index, 1);
                //console.log("Old Item Deleted")
            }

            //Add Updated obj to OldItems 
            oldItems.push(obj);

            //Append Changes to LocalStorage
            localStorage.setItem('itemsArray', JSON.stringify(oldItems));

        }
        currentSuccessPoints++
        //Failed Answer
    } else {
        //If item not exist add it
        if (obj == null) {
            //console.log("New Item")
            var newItem = {
                'Question': questionTxt,
                'LastExecutions': [false]
            }
            //Append Changes to LocalStorage
            oldItems.push(newItem);
            localStorage.setItem('itemsArray', JSON.stringify(oldItems));
        } else {
            //mark as Executed by adding to index 0 true/False
            obj.LastExecutions.splice(0, 0, false)

            //console.log("Updated: ",obj)

            //remove found obj from oldItems
            var index = oldItems.indexOf(obj)
            if (index !== -1) {
                oldItems.splice(index, 1);
                //console.log("Old Item Deleted")
            }

            //Add Updated obj to OldItems 
            oldItems.push(obj);

            //Append Changes to LocalStorage
            localStorage.setItem('itemsArray', JSON.stringify(oldItems));




        }

        currentFailedPoints++
    }

    //Show Success Rate
    oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
    obj = oldItems.find(o => o.Question === questionTxt);

    //Remove Red/Green/Neutral Colors
    for (var s = 0; s <= SuccessRateArray.length - 1; s++) {

        SuccessRateArray[s].classList.remove('green')
        SuccessRateArray[s].classList.remove('red')
        SuccessRateArray[s].classList.add('neutralcircleColor')
    }

    for (let i = 0; i < obj.LastExecutions.length; i++) {

        if (i >= 5) { break; }


        if (obj.LastExecutions[i] === false) {
            console.log("red", i)


            SuccessRateArray[i].classList.remove('neutralcircleColor')

            SuccessRateArray[i].classList.add('red')
            console.log(SuccessRateArray[i])
        } else {

            console.log("green", i)
            SuccessRateArray[i].classList.remove('neutralcircleColor')

            SuccessRateArray[i].classList.add('green')
            console.log(SuccessRateArray[i])
        }

    }


    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {

        //Finished----------------------------------------------------------------------------------------
        clearInterval(timer) //Stop Timer
        //Show Finish Button
        finishButton.innerText = "Finish"
        finishButton.classList.remove('hide')

    };

    scoreSuccesItem.innerText = "Correct: " + currentSuccessPoints
    scoreFailItem.innerText = "Failed: " + currentFailedPoints

}

function endGame() {

    Question10StartButton.classList.remove('hide')
    Question20StartButton.classList.remove('hide')
    Question30StartButton.classList.remove('hide')
    Question50StartButton.classList.remove('hide')
    AllQuestionStart.classList.remove('hide')


    const buttonAnswer = document.getElementById('question-container')
    buttonAnswer.classList.add('hide')

    maintTitle.innerText = "Completed, restart the test!"
    finishButton.classList.add('hide')
}

function setStatusClass(element, correct) {
    clearStatatusClass(element)
    if (correct) {

        element.classList.add('correct')
    } else {
        element.classList.add('wrong')


    }
}
function clearStatatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
    //  document.getElementById('answer-buttons').disabled = 'false';
}

