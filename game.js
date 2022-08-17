import data from './data.js'

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

console.log(correctAnswers)


// using Durstenfeld shuffle based on the implentation found here: https://stackoverflow.com/a/12646864
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayNextEmoji() {
    currentEmoji = remainingEmojis.pop()
    document.getElementById("emojifig").innerHTML = currentEmoji.emoji;

    const emojis = correctAnswers.map(obj => {
        return obj.emoji;
    })
    document.getElementById("score").innerHTML = `Your score is ${correctAnswers.length}. The high score is ${highScore}.`
    document.getElementById("answers").innerHTML = emojis.join(", ");
}

function resetRemainingEmojis() {
    remainingEmojis = data.map(obj => {
        return {
            emoji: obj.emoji,
            category: obj.category
        }
    })
    shuffleArray(remainingEmojis);
}


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

window.handleAnswer = handleAnswer;