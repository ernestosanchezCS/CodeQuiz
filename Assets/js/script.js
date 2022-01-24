//End credits are hidden enable via id=endCredits
//when questions done and
//want to show score and user can enter initials

//disable defaults for submit button
//we use that to store what is in textbox in
//localstorage variable
//add event listener to submit button

var startButton = document.getElementById("start-button");
var highscoresButton = document.getElementById("highscores");
// var submitButton = document.getElementById("start-button");
var goBackButton = document.getElementById("goBack");
var clearScoresButton = document.getElementById("start-button");
var choice1 = document.getElementById("button1");
var choice2 = document.getElementById("button2");
var choice3 = document.getElementById("button3");
var choice4 = document.getElementById("button4");
var highScoresSection = document.getElementById("highscoreList");
var timerElement = document.querySelector(".timer-count");
var round = 1;
var points = 0;
var timerCount = 20;

//we could also take in outside arrays with questions and
//answer batches to make long or customized Q&As
const questions = [
    "How long do set localStorage variables persist in memory?",
    "Before you can save into localStorage what must you do to an object?",
    "What does CSS stand for?",
    "Where do you link JS files to your HRML document?",
];
//answers will be first button then 4th then 2nd then 3rd
//for each question respectively
const batch1 = [
    "Forever",
    "Until browser is closed.",
    "24 Hours",
    "Until the end of current day",
];
const batch2 = [
    "JSON.parse(objectName)",
    "localStorage.setItem(object)",
    "localStorage.getItem(object)",
    "JSON.stringify(objectName)",
];
const batch3 = [
    "Computer Software Systems",
    "Cascading Style Sheets",
    "Computer Server Service",
    "Cpu Server Software",
];
const batch4 = [
    "Right before closing html tag",
    "After CSS link in head",
    "Right before closing body tag",
    "Before CSS link in head",
];

var highScoresObject = {
    initials: [],
    scores: [],
};

//called when page loads
function init() {
    //load
    getHighScores();
}

// These functions are used by init
function getHighScores() {
    // Get stored value from client storage, if it exists
    var storedScores = localStorage.getItem("highScoresObject");
    // If stored value doesn't exist, set highScoresObject to 0
    if (highScoresObject === null) {
        highScoresObject.initials = [];
        highScoresObject.scores = [];
    } else {
        // If a value is retrieved from client storage set the winCounter to that value
        // Use JSON.parse() to convert text to JavaScript object
        let temp = localStorage.getItem("highScoresObject");
        highScoresObject = JSON.parse(temp);
        // highScoresObject.initials = temp.initials;
        // highScoresObject.scores = temp.scores;
    }
}

function openHighScores() {
    //make every hidden except for highscores
    document.getElementById("card1").hidden = true;
    document.getElementById("card2").hidden = true;
    document.getElementById("card3").hidden = true;
    document.getElementById("card4").hidden = false;

    //disable start quiz button and highscores
    startButton.disabled = true;
    highscoresButton.disabled = true;

    //making for loop to put list of highscores from initial and score arrays
    // var ul = document.getElementById("highscoreList");
    // var li = document.createElement("highscoreItem");
    // var children = ul.children.length + 1;
    // li.setAttribute("id", "player" + children);
    // li.appendChild(document.createTextNode("High Score " + children));
    // ul.appendChild(li);
    //wi
}

function startGame() {
    points = 0;
    document.getElementById("card1").hidden = true;
    document.getElementById("card2").hidden = true;
    document.getElementById("card3").hidden = false;
    document.getElementById("card4").hidden = true;
    startButton.disabled = true;
    highscoresButton.disabled = true;
    startTimer();
}

function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function endGame() {
    document.getElementById("card1").hidden = true;
    document.getElementById("card2").hidden = false;
    document.getElementById("card3").hidden = true;
    document.getElementById("card4").hidden = true;

    startButton.disabled = false;
    highscoresButton.disabled = false;
}

function changeCard(){
    //need to change the textContent to next card question 
    //and answers to choose from
    
}

function choiceMade1() {
    if (round == 1) {
        points += 10;
    } else {
        timerCount -= 5;
    }
    //if this was last round end game
    if (round == 4) {
        endGame();
    }
    round++;
    changeCard();
}
function choiceMade2() {
    if (round == 4) {
        endGame();
    }
    round++;
}
function choiceMade3() {
    if (round == 4) {
        endGame();
    }
    round++;
}
function choiceMade4() {
    if (round == 4) {
        endGame();
    }
    round++;
}

startButton.addEventListener("click", startGame);

highscoresButton.addEventListener("click", openHighScores);

goBackButton.addEventListener("click", function () {
    document.getElementById("card1").hidden = false;
    document.getElementById("card2").hidden = true;
    document.getElementById("card3").hidden = true;
    document.getElementById("card4").hidden = true;

    startButton.disabled = false;
    highscoresButton.disabled = false;
});

//no matter if answer is right or wrong goes to next question
//if it was wrong choice tho it takes time off the clock
//correct answers add to points
choice1.addEventListener("click", choiceMade1);
choice2.addEventListener("click", choiceMade2);
choice3.addEventListener("click", choiceMade3);
choice4.addEventListener("click", choiceMade4);

// Calls init() so that it fires when page opened
init();
