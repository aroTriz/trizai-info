/* ========================================
   PIXEL QUEST — Memory Game
   Game Logic
   ======================================== */

const ICONS = ['⭐', '🍄', '❤️', '💎', '🔑', '🏆', '🗡️', '🛡️'];

const CARD_FLIP_DELAY = 1000;
const TOAST_DURATION = 2000;

let state = {
  cards: [],
  flippedIds: [],
  matchedIds: new Set(),
  moves: 0,
  matches: 0,
  timerInterval: null,
  seconds: 0,
  isLocked: false,
  gameStarted: false,
  gameFinished: false
};

// --- DOM refs ---
const board = document.getElementById('gameBoard');
const movesEl = document.getElementById('moves');
const matchesEl = document.getElementById('matches');
const timerEl = document.getElementById('timer');
const winModal = document.getElementById('winModal');
const finalMovesEl = document.getElementById('finalMoves');
const finalTimeEl = document.getElementById('finalTime');
const finalRatingEl = document.getElementById('finalRating');
const toastEl = document.getElementById('toast');
const restartBtn = document.getElementById('restartBtn');

// --- Shuffle ---
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// --- Initialize cards ---
function createCards() {
  const pairs = [...ICONS, ...ICONS];
  return shuffle(pairs).map((icon, index) => ({
    id: index,
    icon,
    isFlipped: false,
    isMatched: false
  }));
}

// --- Render board ---
function renderBoard() {
  board.innerHTML = '';
  state.cards.forEach(card => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.dataset.id = card.id;

    const inner = document.createElement('div');
    inner.className = 'card-inner';

    const back = document.createElement('div');
    back.className = 'card-face card-back';

    const front = document.createElement('div');
    front.className = 'card-face card-front';
    front.innerHTML = `<span class="card-icon">${card.icon}</span>`;

    inner.appendChild(back);
    inner.appendChild(front);
    cardEl.appendChild(inner);

    cardEl.addEventListener('click', () => handleCardClick(card.id));
    board.appendChild(cardEl);
  });
}

// --- Update UI ---
function updateStats() {
  movesEl.textContent = state.moves;
  matchesEl.textContent = state.matches;
}

function updateTimer() {
  const m = String(Math.floor(state.seconds / 60)).padStart(2, '0');
  const s = String(state.seconds % 60).padStart(2, '0');
  timerEl.textContent = `${m}:${s}`;
}

// --- Timer ---
function startTimer() {
  if (state.timerInterval) return;
  state.gameStarted = true;
  state.timerInterval = setInterval(() => {
    state.seconds++;
    updateTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(state.timerInterval);
  state.timerInterval = null;
}

// --- Get card element ---
function getCardEl(id) {
  return board.querySelector(`.card[data-id="${id}"]`);
}

// --- Flip card ---
function flipCard(id) {
  const card = state.cards.find(c => c.id === id);
  if (!card) return;
  const el = getCardEl(id);
  if (!el) return;
  card.isFlipped = true;
  el.classList.add('flipped');
}

function unflipCard(id) {
  const card = state.cards.find(c => c.id === id);
  if (!card) return;
  const el = getCardEl(id);
  if (!el) return;
  card.isFlipped = false;
  el.classList.remove('flipped');
}

function matchCard(id) {
  const card = state.cards.find(c => c.id === id);
  if (!card) return;
  const el = getCardEl(id);
  if (!el) return;
  card.isMatched = true;
  card.isFlipped = true;
  el.classList.remove('flipped');
  el.classList.add('matched');
  state.matchedIds.add(id);
}

function markMismatch(id) {
  const el = getCardEl(id);
  if (!el) return;
  el.classList.add('mismatch');
  setTimeout(() => {
    el.classList.remove('mismatch');
  }, 400);
}

// --- Toast ---
let toastTimeout = null;

function showToast(message, isError = false) {
  clearTimeout(toastTimeout);
  toastEl.textContent = message;
  toastEl.style.background = isError
    ? 'linear-gradient(180deg, #e74c3c, #c0392b)'
    : 'linear-gradient(180deg, #2ecc71, #27ae60)';
  toastEl.style.borderColor = isError
    ? '#ff6b6b #96281b #96281b #ff6b6b'
    : '#58d68d #1e8449 #1e8449 #58d68d';
  toastEl.classList.add('show');
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove('show');
  }, TOAST_DURATION);
}

// --- Screen shake ---
function screenShake() {
  const wrapper = document.querySelector('.game-wrapper');
  wrapper.classList.remove('screen-shake');
  // force reflow
  void wrapper.offsetWidth;
  wrapper.classList.add('screen-shake');
  setTimeout(() => wrapper.classList.remove('screen-shake'), 300);
}

// --- Confetti ---
function spawnConfetti() {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  const colors = ['#FFD700', '#FF6B6B', '#2ECC71', '#5C94FC', '#FF69B4', '#FFA500', '#9B59B6'];
  const count = 60;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = `${4 + Math.random() * 8}px`;
    piece.style.height = `${4 + Math.random() * 8}px`;
    piece.style.animationDuration = `${1.5 + Math.random() * 2}s`;
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    container.appendChild(piece);
  }

  setTimeout(() => {
    container.remove();
  }, 4000);
}

// --- Calculate rating ---
function getRating() {
  if (state.moves <= 12) return '★★★';
  if (state.moves <= 20) return '★★☆';
  return '★☆☆';
}

// --- Win ---
function showWinScreen() {
  state.gameFinished = true;
  stopTimer();

  finalMovesEl.textContent = state.moves;
  finalTimeEl.textContent = timerEl.textContent;
  finalRatingEl.textContent = getRating();
  winModal.classList.add('active');

  spawnConfetti();
}

// --- Reset ---
function restartGame() {
  stopTimer();
  winModal.classList.remove('active');

  state.cards = createCards();
  state.flippedIds = [];
  state.matchedIds = new Set();
  state.moves = 0;
  state.matches = 0;
  state.seconds = 0;
  state.isLocked = false;
  state.gameStarted = false;
  state.gameFinished = false;

  updateStats();
  updateTimer();
  renderBoard();
}

// --- Card click handler ---
function handleCardClick(id) {
  const card = state.cards.find(c => c.id === id);

  // Guard clauses
  if (state.isLocked) return;
  if (state.gameFinished) return;
  if (card.isMatched) return;
  if (card.isFlipped) return;
  if (state.flippedIds.length >= 2) return;
  if (state.flippedIds.includes(id)) return;

  // Start timer on first click
  if (!state.gameStarted) {
    startTimer();
  }

  // Flip the card
  flipCard(id);
  state.flippedIds.push(id);

  // If two cards are flipped, check for match
  if (state.flippedIds.length === 2) {
    state.moves++;
    updateStats();
    checkMatch();
  }
}

// --- Check match ---
function checkMatch() {
  const [id1, id2] = state.flippedIds;
  const card1 = state.cards.find(c => c.id === id1);
  const card2 = state.cards.find(c => c.id === id2);

  if (card1.icon === card2.icon) {
    // Match!
    state.isLocked = true;

    setTimeout(() => {
      matchCard(id1);
      matchCard(id2);
      state.matches++;
      updateStats();

      showToast('✨ Match! ✨');
      screenShake();

      state.flippedIds = [];
      state.isLocked = false;

      // Check win
      if (state.matches === ICONS.length) {
        setTimeout(() => showWinScreen(), 400);
      }
    }, 400);

  } else {
    // No match
    state.isLocked = true;

    setTimeout(() => {
      markMismatch(id1);
      markMismatch(id2);

      setTimeout(() => {
        unflipCard(id1);
        unflipCard(id2);
        state.flippedIds = [];
        state.isLocked = false;
      }, 400);
    }, 600);
  }
}

// --- Keyboard shortcut ---
document.addEventListener('keydown', (e) => {
  if (e.key === 'r' || e.key === 'R') restartGame();
  if (e.key === 'Enter' && winModal.classList.contains('active')) {
    restartGame();
  }
});

// --- Init ---
restartGame();
