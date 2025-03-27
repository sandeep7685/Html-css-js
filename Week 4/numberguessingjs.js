document.addEventListener('DOMContentLoaded', () => {
    // Game state
    let randomNumber;
    let guessCount = 0;
    let maxAttempts;
    let minRange;
    let maxRange;
    let difficulty = null;

    // DOM elements
    const userGuess = document.getElementById('userGuess');
    const submitGuess = document.getElementById('submitGuess');
    const resetGame = document.getElementById('resetGame');
    const hintButton = document.getElementById('hint');
    const message = document.getElementById('message');
    const guessCountDisplay = document.getElementById('guessCount');
    const attemptsLeftDisplay = document.getElementById('attemptsLeft');
    const highScoreDisplay = document.getElementById('highScore');
    const rangeInfo = document.getElementById('rangeInfo');
    const easyBtn = document.getElementById('easy');
    const mediumBtn = document.getElementById('medium');
    const hardBtn = document.getElementById('hard');

    // Debug: Verify elements are loaded
    console.log('DOM elements:', { userGuess, submitGuess, resetGame, hintButton, easyBtn, mediumBtn, hardBtn });

    // Difficulty settings
    const difficulties = {
        easy: { min: 1, max: 50, attempts: 15 },
        medium: { min: 1, max: 100, attempts: 10 },
        hard: { min: 1, max: 200, attempts: 8 }
    };

    // Set difficulty
    function setDifficulty(level) {
        console.log(`Difficulty set to: ${level}`);
        difficulty = level;
        minRange = difficulties[level].min;
        maxRange = difficulties[level].max;
        maxAttempts = difficulties[level].attempts;
        resetGameState();
        userGuess.disabled = false;
        submitGuess.disabled = false;
        hintButton.disabled = false;
        rangeInfo.textContent = `Guess a number between ${minRange} and ${maxRange}`;
        const highScore = localStorage.getItem(`highScore_${level}`) || '-';
        highScoreDisplay.textContent = `High Score: ${highScore}`;
    }

    // Check guess
    function checkGuess() {
        console.log('Submit Guess clicked');
        const guess = parseInt(userGuess.value);

        if (isNaN(guess) || guess < minRange || guess > maxRange) {
            message.textContent = `Please enter a number between ${minRange} and ${maxRange}!`;
            return;
        }

        guessCount++;
        guessCountDisplay.textContent = `Guesses: ${guessCount}`;
        attemptsLeftDisplay.textContent = `Attempts left: ${maxAttempts - guessCount}`;

        if (guess === randomNumber) {
            message.textContent = `Congratulations! You got it in ${guessCount} guesses!`;
            updateHighScore();
            endGame();
        } else {
            message.textContent = guess < randomNumber ? "Too low!" : "Too high!";
        }

        if (guessCount >= maxAttempts) {
            message.textContent = `Game Over! The number was ${randomNumber}.`;
            endGame();
        }

        userGuess.value = '';
    }

    // Hint function
    function giveHint() {
        console.log('Hint clicked');
        if (guessCount < 3) {
            message.textContent = "Make at least 3 guesses before getting a hint!";
            return;
        }
        const range = Math.floor((maxRange - minRange) / 4);
        const hintMin = Math.max(minRange, randomNumber - range);
        const hintMax = Math.min(maxRange, randomNumber + range);
        message.textContent = `Hint: The number is between ${hintMin} and ${hintMax}.`;
        hintButton.disabled = true;
    }

    // Update high score
    function updateHighScore() {
        const currentHighScore = localStorage.getItem(`highScore_${difficulty}`);
        if (!currentHighScore || guessCount < parseInt(currentHighScore)) {
            localStorage.setItem(`highScore_${difficulty}`, guessCount);
            highScoreDisplay.textContent = `High Score: ${guessCount}`;
        }
    }

    // End game
    function endGame() {
        submitGuess.disabled = true;
        userGuess.disabled = true;
        hintButton.disabled = true;
    }

    // Reset game
    function resetGameState() {
        console.log('Reset Game clicked');
        if (!difficulty) {
            message.textContent = "Please select a difficulty first!";
            return;
        }
        randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
        guessCount = 0;
        message.textContent = '';
        guessCountDisplay.textContent = "Guesses: 0";
        attemptsLeftDisplay.textContent = `Attempts left: ${maxAttempts}`;
        submitGuess.disabled = false;
        userGuess.disabled = false;
        hintButton.disabled = false;
        userGuess.value = '';
    }

    // Event listeners
    easyBtn.addEventListener('click', () => setDifficulty('easy'));
    mediumBtn.addEventListener('click', () => setDifficulty('medium'));
    hardBtn.addEventListener('click', () => setDifficulty('hard'));
    submitGuess.addEventListener('click', checkGuess);
    resetGame.addEventListener('click', resetGameState);
    hintButton.addEventListener('click', giveHint);
    userGuess.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            checkGuess();
        }
    });
});