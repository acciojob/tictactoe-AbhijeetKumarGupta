//your JS code here. If required.
const form = document.getElementById('player-form');
const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const game = document.getElementById('game');
const message = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');
const restart = document.getElementById('restart');

let players = [];
let currentPlayer = 0;
let board = Array(9).fill('');
let gameOver = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

form.addEventListener('submit', event => {
  event.preventDefault();

  const name1 = player1Input.value.trim();
  const name2 = player2Input.value.trim();

  if (!name1 || !name2) return;

  players = [
    { name: name1, mark: 'x' },
    { name: name2, mark: 'o' }
  ];

  form.style.display = 'none';
  game.style.display = 'block';

  resetGame();
});

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (gameOver || board[index] !== '' || players.length !== 2) return;

    board[index] = players[currentPlayer].mark;
    cell.textContent = players[currentPlayer].mark;

    const won = winningCombinations.some(combination =>
      combination.every(position => board[position] === players[currentPlayer].mark)
    );

    if (won) {
      message.textContent = `${players[currentPlayer].name} congratulations you won!`;
      gameOver = true;
      return;
    }

    if (board.every(value => value !== '')) {
      message.textContent = "It's a draw!";
      gameOver = true;
      return;
    }

    currentPlayer = 1 - currentPlayer;
    message.textContent = `${players[currentPlayer].name}, you're up`;
  });
});

restart.addEventListener('click', resetGame);

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 0;
  gameOver = false;

  cells.forEach(cell => {
    cell.textContent = '';
  });

  message.textContent = `${players[currentPlayer].name}, you're up`;
}