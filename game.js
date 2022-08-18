import data from './data.js'

//returns only the "emoji" and "category" property from the objects in the original data array
let remainingEmojis = data.map(obj => {
    return {
        emoji: obj.emoji,
        category: obj.category
    }
})

shuffleArray(remainingEmojis);

let correctAnswers = []
let highScore;
let currentEmoji;
let remainingSeconds = 60;
let timer;

if ("highScore" in localStorage) {
    highScore = Number(localStorage.getItem("highScore"))
} else {
    highScore = 0;
    localStorage.setItem("highScore", 0);
}

displayNextEmoji()

// using Durstenfeld shuffle based on the implentation found here: https://stackoverflow.com/a/12646864
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//shows the subsequent emoji in the array 
function displayNextEmoji() {
    currentEmoji = remainingEmojis.pop()
    document.getElementById("emojifig").innerHTML = currentEmoji.emoji;

    const emojis = correctAnswers.map(obj => {
        return obj.emoji;
    })
    document.getElementById("score").innerHTML = `Your score is ${correctAnswers.length}. The high score is ${highScore}.`
    document.getElementById("answers").innerHTML = emojis.join(" ");
}

//returns to the original state of the game with answers reset
function resetRemainingEmojis() {
    remainingEmojis = data.map(obj => {
        return {
            emoji: obj.emoji,
            category: obj.category
        }
    })
    shuffleArray(remainingEmojis);
}


//if player guesses correctly, currentEmoji is added to the correctAnswers array and displayed, as well as a count of the 
//high score. Then the next emoji is shown. If player is incorrect, everything is reset and they must start over.
function handleAnswer(isFlag) {
    let currentEmojiIsFlag = currentEmoji.category === "Flags";

    if (!timer) {
        timer = setInterval(updateTimer, 1000);
    }

    if (isFlag === currentEmojiIsFlag) {
        correctAnswers.push(currentEmoji);

        if (correctAnswers.length > highScore) {
            highScore = correctAnswers.length;
            localStorage.setItem("highScore", highScore);
        }

        displayNextEmoji()
    } else {
        playerLoses("You lose. Try again!")
    }
}

function playerLoses(msg) {
    resetRemainingEmojis();
    correctAnswers = [];
    displayNextEmoji();
    resetTimer();
    document.getElementById("timer").innerHTML = `Time remaining: ${remainingSeconds}`
    alert(msg)
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    remainingSeconds = 60;
}

document.addEventListener("keydown", (event) => {
    if (event.key === "y") {
        handleAnswer(true)
    } else if (event.key === "n") {
        handleAnswer(false)
    }
});

function updateTimer() {
    console.log(remainingSeconds);
    remainingSeconds--
    document.getElementById("timer").innerHTML = `Time remaining: ${remainingSeconds}`
    if (remainingSeconds <= 0) {
        playerLoses("You ran out of time!")
    }
}

window.handleAnswer = handleAnswer;