// DOM Elements
const resultArea = document.getElementById("results");
const winsCounter = document.getElementById("wins");
const lossesCounter = document.getElementById("losses");
const drawsCounter = document.getElementById("draws");
const historyTable = document.getElementById("history");

// Game Variables
let wins = 0;
let losses = 0;
let draws = 0;
let history = [];

// Game choices
const choices = ["rock", "paper", "scissors"];

// Choice names for proper display
const choiceNames = {
  rock: "Rock",
  paper: "Paper",
  scissors: "Scissors",
};

// Event listeners
// Every single button call the playGame function with different parameters
document
  .getElementById("rock")
  .addEventListener("click", () => playGame("rock"));
document
  .getElementById("paper")
  .addEventListener("click", () => playGame("paper"));
document
  .getElementById("scissors")
  .addEventListener("click", () => playGame("scissors"));

/**
 * Simulates a round of Rock Paper Scissors.
 *
 * @param {string} playerChoice - The player's choice, expected to be one of "rock", "paper", or "scissors".
 * Determines the computer's random choice and calculates the result of the game.
 * Updates the UI with the result, statistics, and game history.
 */
function playGame(playerChoice) {
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  const result = determineResult(playerChoice, computerChoice);

  updateResults(playerChoice, computerChoice, result);
  updateStats(result);
  updateHistory(playerChoice, computerChoice, result);
}

/**
 * Determines the result of a Rock Paper Scissors game given the player's and computer's choices.
 *
 * @param {string} playerChoice - The player's choice, expected to be one of "rock", "paper", or "scissors".
 * @param {string} computerChoice - The computer's choice, expected to be one of "rock", "paper", or "scissors".
 *
 * @returns {"win" | "loss" | "draw"} - The result of the game, either "win", "loss", or "draw".
 */
function determineResult(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "draw";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    return "win";
  } else {
    return "loss";
  }
}

/**
 * Updates the result area of the game with the latest result.
 *
 * @param {string} player - The player's choice, expected to be one of "rock", "paper", or "scissors".
 * @param {string} computer - The computer's choice, expected to be one of "rock", "paper", or "scissors".
 * @param {"win" | "loss" | "draw"} result - The result of the game, either "win", "loss", or "draw".
 */
function updateResults(player, computer, result) {
  // Render the result
  resultArea.innerHTML = `
    <div class="text-center">
      <p><strong>You:</strong> ${choiceNames[player]}</p>
      <p><strong>Computer:</strong> ${choiceNames[computer]}</p>
      <p>
        <strong>Result:</strong>
        ${
          result === "win"
            ? "You Win!"
            : result === "loss"
            ? "You Lose!"
            : "It's a Draw!"
        }
      </p>
    </div>
  `;
}

/**
 * Updates the win/loss/draw counters based on the given result.
 *
 * @param {"win" | "loss" | "draw"} result - The result of the game, either "win", "loss", or "draw".
 */
function updateStats(result) {
  if (result === "win") {
    wins++;
    winsCounter.textContent = wins;
  } else if (result === "loss") {
    losses++;
    lossesCounter.textContent = losses;
  } else {
    draws++;
    drawsCounter.textContent = draws;
  }
}

/**
 * Updates the game history table with the latest result.
 *
 * @param {string} player - The player's choice, expected to be one of "rock", "paper", or "scissors".
 * @param {string} computer - The computer's choice, expected to be one of "rock", "paper", or "scissors".
 * @param {"win" | "loss" | "draw"} result - The result of the game, either "win", "loss", or "draw".
 */
function updateHistory(player, computer, result) {
  // Add new register on the first position in the array
  history.unshift({ player, computer, result });
  // When the history array is longer than 5, remove the last element
  if (history.length > 5) {
    history.pop();
  }

  // Render the history
  historyTable.innerHTML = history
    .map((game) => `
      <tr class="bg-gray-50 border-b">
        <td class="px-6 py-4">${choiceNames[game.player]}</td>
        <td class="px-6 py-4">${choiceNames[game.computer]}</td>
        <td class="px-6 py-4">
          ${
            game.result === "win"
            ? "Win"
            : game.result === "loss"
            ? "Loss"
            : "Draw"
          }
        </td>
      </tr>
    `
  ).join("");
}
