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
let highScore = 0;
let currentEmoji;

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

    if (isFlag === currentEmojiIsFlag) {
        correctAnswers.push(currentEmoji);

        if (correctAnswers.length > highScore) {
            highScore = correctAnswers.length;
        }

        displayNextEmoji()
    } else {
        resetRemainingEmojis();
        correctAnswers = [];
        displayNextEmoji();
        alert("You lose! Sorry")
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key === "y") {
        handleAnswer(true)
    } else if (event.key === "n") {
        handleAnswer(false)
    }
});

window.handleAnswer = handleAnswer;