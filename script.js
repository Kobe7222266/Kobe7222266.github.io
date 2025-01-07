let balance = 1000; // Starting balance
let isSpinning = false;
let currentWinnings = 0;
let gameActive = true;

// Slot machine symbols and payouts
const symbols = ['🌊', '🦈', '🐬', '⚓', '🏝️'];
const payoutValues = {
    '🌊': 10,
    '🦈': -1, // Lose all winnings
    '🐬': 50, // Big win
    '⚓': 20, // Moderate win
    '🏝️': 30 // Moderate win
};

// Get DOM elements
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const spinButton = document.getElementById('spin-button');
const cashoutButton = document.getElementById('cashout-button');
const balanceDisplay = document.getElementById('balance');
const messageDisplay = document.getElementById('message');

// Function to randomly pick a symbol for the reels
function getRandomSymbol() {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
}

// Function to spin the reels
function spinReels() {
    if (isSpinning) return; // Prevent multiple spins at once
    isSpinning = true;

    spinButton.disabled = true;
    messageDisplay.innerHTML = "Spinning...";

    // Randomly pick symbols for the three reels
    reel1.innerHTML = getRandomSymbol();
    reel2.innerHTML = getRandomSymbol();
    reel3.innerHTML = getRandomSymbol();

    // Simulate a delay before checking results
    setTimeout(() => {
        checkResults();
    }, 1000); // Wait for 1 second before checking results
}

// Function to check the results of the spin
function checkResults() {
    const result = [reel1.innerHTML, reel2.innerHTML, reel3.innerHTML];
    let winnings = 0;

    // Check for special symbols (Sharks, Dolphins, etc.)
    for (let i = 0; i < result.length; i++) {
        const symbol = result[i];
        if (symbol === '🦈') {
            messageDisplay.innerHTML = "You hit a shark! You lost everything!";
            currentWinnings = 0;
            balance -= currentWinnings;
            updateBalance();
            spinButton.disabled = false;
            cashoutButton.disabled = true;
            return;
        }
        winnings += payoutValues[symbol] || 0;
    }

    // Update current winnings
    currentWinnings = winnings;
    messageDisplay.innerHTML = `You won ${currentWinnings} coins!`;

    // If the player wins, enable the Cash Out button
    if (currentWinnings > 0) {
        cashoutButton.disabled = false;
    }

    // Update balance
    updateBalance();
    isSpinning = false;
    spinButton.disabled = false;
}

// Function to update the balance display
function updateBalance() {
    balanceDisplay.innerHTML = `Balance: ${balance + currentWinnings}`;
}

// Cash out button handler
cashoutButton.addEventListener('click', () => {
    balance += currentWinnings;
    currentWinnings = 0;
    messageDisplay.innerHTML = "You cashed out!";
    updateBalance();
    spinButton.disabled = false;
    cashoutButton.disabled = true;
});

// Spin button handler
spinButton.addEventListener('click', () => {
    if (!gameActive) return;
    spinReels();
});
