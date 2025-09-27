const gameBoard = document.getElementById("gameBoard");
const symbols = ['🍎', '🍌', '🍇', '🍉', '🍍', '🥝', '🍓', '🍒'];
let cards = [...symbols, ...symbols]; // Duplicate for pairs
let flippedCards = [];
let matched = [];

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  const shuffled = shuffle(cards);
  gameBoard.innerHTML = '';

  shuffled.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.innerText = '';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard(e) {
  const clicked = e.currentTarget;

  if (flippedCards.length < 2 && !clicked.classList.contains('flipped') && !clicked.classList.contains('matched')) {
    clicked.classList.add('flipped');
    clicked.innerText = clicked.dataset.symbol;
    flippedCards.push(clicked);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matched.push(card1.dataset.symbol);
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.innerText = '';
    card2.innerText = '';
  }

  flippedCards = [];

  if (matched.length === symbols.length) {
    setTimeout(() => {
      alert('🎉 Congratulations! You found all pairs!');
      createBoard();
      matched = [];
    }, 500);
  }
}

createBoard();
