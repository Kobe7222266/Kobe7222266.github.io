// Game logic
let randomNumber = Math.floor(Math.random() * 100) + 1;  // Random number between 1 and 100
let attempts = 0;

function checkGuess() {
    const userGuess = parseInt(document.getElementById('userGuess').value);
    const message = document.getElementById('message');
    const attemptsText = document.getElementById('attempts');

    attempts++;
    
    if (isNaN(userGuess)) {
        message.textContent = "Please enter a valid number!";
        return;
    }

    if (userGuess < randomNumber) {
        message.textContent = "Too low! Try again.";
    } else if (userGuess > randomNumber) {
        message.textContent = "Too high! Try again.";
    } else {
        message.textContent = `Congratulations! You guessed the number in ${attempts} attempts.`;
    }

    attemptsText.textContent = `Attempts: ${attempts}`;
}
