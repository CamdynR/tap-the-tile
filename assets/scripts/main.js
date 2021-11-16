// main.js

window.addEventListener('DOMContentLoaded', init);
let startTime = 0;
let currScore = 0;
let intervalId = null;

function init() {
  const tileBoard = document.querySelector('tile-board');
  const score = document.querySelector('#score');
  const time = document.querySelector('#time-left');
  tileBoard.addEventListener('score-update', e => {
    if (startTime == 0) {
      startTime = new Date().getTime();
      time.innerHTML = Number(time.innerHTML) - 1;
      time.setAttribute('class', 'start');
      intervalId = setInterval(() => {
        if (Number(time.innerHTML) > 9 && Number(time.innerHTML) <= 20) {
          time.setAttribute('class', 'halfway');
        }
        if (Number(time.innerHTML) >= 0 && Number(time.innerHTML) <= 10) {
          time.setAttribute('class', 'tenSec');
        }
        const newTime = new Date().getTime();
        if (Number(time.innerHTML) == 0 || startTime - newTime >= 30000) {
          startTime = 0;
          tileBoard.score = 0;
          score.innerHTML = `${currScore} - Game Over`;
          score.classList.remove('in-game');
          score.classList.add('game-over');
          time.setAttribute('class', '');
          clearInterval(intervalId);
          intervalId = null;
          time.innerHTML = 30;
        } else {
          time.innerHTML = Number(time.innerHTML) - 1;
        }
      }, 1000);
    }
    
    score.classList.remove('game-over');
    score.classList.add('in-game');
    score.innerHTML = e.detail.score;
    currScore = e.detail.score;
  });
  tileBoard.addEventListener('game-over', e => {
    startTime = 0;
    score.innerHTML = `${currScore} - Game Over`;
    score.classList.remove('in-game');
    score.classList.add('game-over');
    time.setAttribute('class', '');
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    time.innerHTML = 30;
  });
}
