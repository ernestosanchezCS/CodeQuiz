var startButton = document.getElementById("start-button");
var highscoresButton = document.getElementById("highscores");
var goBackButton = document.getElementById("goBack");
var clearButton = document.getElementById("clearScore");
var clearScoresButton = document.getElementById("start-button");
var choice1 = document.getElementById("button1");
var choice2 = document.getElementById("button2");
var choice3 = document.getElementById("button3");
var choice4 = document.getElementById("button4");
var form = document.getElementById("formHS");
var ul = document.getElementById("highscoreList");
var timerElement = document.querySelector(".timer-count");
var submitBtn = document.getElementById("submitBtn");
var round = 1;
var points = 0;
var timerCount = 10;

//we could also take in outside arrays with questions and
//answer batches to make long or customized Q&As
//also
const questions = [
    "How long do set localStorage variables persist in memory?",
    "Before you can save into localStorage what must you do to an object?",
    "What does CSS stand for?",
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

var highScoresObject = {
    initials: [],
    scores: [],
};

function openHighScores() {
    //make every hidden except for highscores
    document.getElementById("card1").hidden = true;
    document.getElementById("card2").hidden = true;
    document.getElementById("card3").hidden = true;
    document.getElementById("card4").hidden = false;

    //disable start quiz button and highscores
    startButton.disabled = true;
    highscoresButton.disabled = true;

    if (!(localStorage.getItem("highscores") == null)) {
        //we have saved scored
        var stored = JSON.parse(localStorage.getItem("highscores"));
        for (i = 0; i < stored.initials.length; i++) {
            let name = stored.initials[i];
            let number = stored.scores[i];
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(name + "  :  " + number));
            ul.appendChild(li);
        }
    }
}

function addScore(event) {
    event.preventDefault();
    submitBtn.disabled = true;
    console.log(document.getElementById("Initials").value);
    //stores what user ented as initials into initialsEntered
    var initialsEntered = document.getElementById("Initials").value;
    //resets value of text input
    document.getElementById("Initials").value = "";
    console.log(localStorage.getItem("highscores"));

    if (localStorage.getItem("highscores") == null) {
        //no localstorage yet
        highScoresObject.initials[0] = initialsEntered;
        highScoresObject.scores[0] = points;
        console.log(highScoresObject);
        localStorage.setItem("highscores", JSON.stringify(highScoresObject));
    } else {
        //we already have local storage highscores object made
        //we getitem from local storage and JSON.parse it to get object back
        //just need to push onto object arrays
        //then setitem localstorage stringify it back
        var storedScores = JSON.parse(localStorage.getItem("highscores"));
        storedScores.initials.push(initialsEntered);
        storedScores.scores.push(points);
        localStorage.setItem("highscores", JSON.stringify(storedScores));
    }
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
    document.getElementById("question").innerHTML = questions[0];
    choice1.innerHTML = batch1[0];
    choice2.innerHTML = batch1[1];
    choice3.innerHTML = batch1[2];
    choice4.innerHTML = batch1[3];
    timerCount = 11;
    round = 1;
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        // Tests if time has run out
        if (timerCount <= 0) {
            // Clears interval
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    document.getElementById("finalScoreTag").innerHTML = points;
    document.getElementById("card1").hidden = true;
    document.getElementById("card2").hidden = false;
    document.getElementById("card3").hidden = true;
    document.getElementById("card4").hidden = true;
    timerElement.textContent = timerCount;
    startButton.disabled = false;
    highscoresButton.disabled = false;
    submitBtn.disabled = false;
}

function changeCard() {
    //need to change the textContent to next card question
    //and answers to choose from

    if (round == 1) {
        //change to round two
        //change
        round++;
        document.getElementById("question").innerHTML = questions[1];
        choice1.innerHTML = batch2[0];
        choice2.innerHTML = batch2[1];
        choice3.innerHTML = batch2[2];
        choice4.innerHTML = batch2[3];
        return;
    } else if (round == 2) {
        //change to round 3
        round++;
        document.getElementById("question").innerHTML = questions[2];
        choice1.innerHTML = batch3[0];
        choice2.innerHTML = batch3[1];
        choice3.innerHTML = batch3[2];
        choice4.innerHTML = batch3[3];

        return;
    } else {
        //just ented last answer time to end game
        clearInterval(timer);
        setTimeout(function () {
            endGame();
        }, 1500);
    }
}

function choiceMade1() {
    if (round == 1) {
        points += 10;
        //display right for 1.5 seconds points +10
        document.getElementById("rightWrong").innerHTML = "Right!";
        document.getElementById("rightWrong").hidden = false;
        setTimeout(function () {
            document.getElementById("rightWrong").hidden = true;
        }, 600);
        //now we swith question
        changeCard();
    } else {
        timerCount -= 2;
        //display right for 1.5 seconds points +10
        document.getElementById("rightWrong").innerHTML =
            "Wrong! 2 Second Penalty Applied";
        document.getElementById("rightWrong").hidden = false;
        setTimeout(function () {
            document.getElementById("rightWrong").hidden = true;
        }, 600);
        //now we swith question
        changeCard();
    }
    //if this was last round end game
    if (round == 4) {
        endGame();
    }
}
function choiceMade2() {
    if (round == 3) {
        points += 10;
        //display right for 1.5 seconds points +10
        document.getElementById("rightWrong").innerHTML = "Right!";
        document.getElementById("rightWrong").hidden = false;
        setTimeout(function () {
            document.getElementById("rightWrong").hidden = true;
        }, 600);
        //now we swith  question
        changeCard();
    } else {
        timerCount -= 2;
        //display right for 1.5 seconds points +10
        document.getElementById("rightWrong").innerHTML =
            "Wrong! 2 Second Penalty Applied";
        document.getElementById("rightWrong").hidden = false;
        setTimeout(function () {
            document.getElementById("rightWrong").hidden = true;
        }, 600);
        //now we swith question
        changeCard();
    }
    if (round == 4) {
        endGame();
    }
}
function choiceMade3() {
    //this choice always wrong never the right answer
    //so we just display wrong deduct time and change card
    timerCount -= 2;
    //display right for 1.5 seconds points +10
    document.getElementById("rightWrong").innerHTML =
        "Wrong! 2 Second Penalty Applied";
    document.getElementById("rightWrong").hidden = false;
    setTimeout(function () {
        document.getElementById("rightWrong").hidden = true;
    }, 1500);
    //now we swith question
    changeCard();
    if (round == 4) {
        endGame();
    }
}
function choiceMade4() {
    if (round == 2) {
        points += 10;
        //display right for 1.5 seconds points +10
        document.getElementById("rightWrong").innerHTML = "Right!";
        document.getElementById("rightWrong").hidden = false;
        setTimeout(function () {
            document.getElementById("rightWrong").hidden = true;
        }, 1500);
        //now we switch question 2
        changeCard();
    } else {
        timerCount -= 5;
    }
    if (round == 4) {
        endGame();
    }
}

function goBackBtn() {
    //delete the list items we made in highscore page
    // const parent = document.getElementById("foo")
    // while (parent.firstChild) {
    //     parent.firstChild.remove()
    // }
    while (ul.firstChild) {
        ul.firstChild.remove();
    }
    document.getElementById("card1").hidden = false;
    document.getElementById("card2").hidden = true;
    document.getElementById("card3").hidden = true;
    document.getElementById("card4").hidden = true;

    startButton.disabled = false;
    highscoresButton.disabled = false;
}

function clearScores() {
    localStorage.clear();
    while (ul.firstChild) {
        ul.firstChild.remove();
    }
}

startButton.addEventListener("click", startGame);

highscoresButton.addEventListener("click", openHighScores);

form.addEventListener("submit", addScore);

goBackButton.addEventListener("click", goBackBtn);

clearButton.addEventListener("click", clearScores);

//no matter if answer is right or wrong goes to next question
//if it was wrong choice tho it takes time off the clock
//correct answers add to points
choice1.addEventListener("click", choiceMade1);
choice2.addEventListener("click", choiceMade2);
choice3.addEventListener("click", choiceMade3);
choice4.addEventListener("click", choiceMade4);
