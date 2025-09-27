const randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
  const guess = parseInt(document.getElementById("guessInput").value);
  const message = document.getElementById("message");
  attempts++;

  if (isNaN(guess)) {
    message.style.color = "red";
    message.textContent = "⛔ Please enter a valid number.";
  } else if (guess < 1 || guess > 100) {
    message.style.color = "red";
    message.textContent = "⚠️ Number must be between 1 and 100.";
  } else if (guess === randomNumber) {
    message.style.color = "green";
    message.textContent = `🎉 Correct! You guessed it in ${attempts} tries.`;
  } else if (guess < randomNumber) {
    message.style.color = "orange";
    message.textContent = "📉 Too low! Try again.";
  } else {
    message.style.color = "orange";
    message.textContent = "📈 Too high! Try again.";
  }
}
