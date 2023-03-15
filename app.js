document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid');
  const scoreDiaplay = document.querySelector('span');
  const startBtn = document.querySelector('.start');

  const width = 10; // use for move up/down
  let currentIndex = 0; // first div in grid
  let appleIndex = 0;
  let currentSnake = [2, 1, 0]; // snakehead = 2 , snaketail = 0

  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let internal = 0;

  // function to keycodes
  function control(e) {
    squares[currentIndex].classList.remove('snake') // remove class snake depending on key press

    if (e.keyCode === 39) {
      direction + 1; // right arrow = move right
    } else if (e.keyCode === 38) {
      direction -= width; // up arrow = move up
    } else if (e.keyCode === 37) {
      direction - 1; // left arrow = move left
    } else if (e.keyCode === 36) {
      direction += width; // down arrow = move down
    }
  };

  // event listen for keypress it will execute fn control
  document.addEventListener('keyup', control)

});