document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div');
  const scoreDisplay = document.querySelector('span');
  const startBtn = document.querySelector('.start');

  const width = 10; // use for move up/down
  let currentIndex = 0; // first div in grid
  let appleIndex = 0;
  let currentSnake = [2, 1, 0]; // snakehead = 2 , snaketail = 0

  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

  // start/reset game
  function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(interval);
    score = 0;
    randomApple();
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    interval = setInterval(moveOutcomes, intervalTime);
  };

  // function that deals with all outcomes of snake (hitting border, self, etc)
  function moveOutcomes() {
    if (
      // snake hits bottom
      (currentSnake[0] + width >= (width * width) && direction === width) ||
      // snake hits right wall
      (currentSnake[0] % width === width - 1 && direction === 1) ||
      // snake hits left wall
      (currentSnake[0] % width === 0 && direction === -1) ||
      // snake hits top
      (currentSnake[0] - width < 0 && direction === -width) ||
      // snake hits itself
      squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
      return clearInterval(interval);
    };
    const tail = currentSnake.pop(); // remove last array of snake
    squares[tail].classList.remove('snake'); // remove class of snake from tail
    currentSnake.unshift(currentSnake[0] + direction); // gives direciton to head

    // deals with snake eating apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple');
      squares[tail].classList.add('snake'); // snake grows
      currentSnake.push(tail);
      // generate random apple
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcomes, intervalTime);
    };
    squares[currentSnake[0]].classList.add('snake');
  };

  // function to generate apple
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
  };

  // function to keycodes
  function control(e) {
    squares[currentIndex].classList.remove('snake') // remove class snake depending on key press

    if (e.keyCode === 39) {
      direction = 1; // right arrow = move right
    } else if (e.keyCode === 38) {
      direction = -width; // up arrow = move up
    } else if (e.keyCode === 37) {
      direction = -1; // left arrow = move left
    } else if (e.keyCode === 40) {
      direction = +width; // down arrow = move down
    }
  };

  // event listen for keypress it will execute fn control
  document.addEventListener('keyup', control);
  startBtn.addEventListener('click', startGame);
});