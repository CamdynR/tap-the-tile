// TileBoard.js

const rowsTall = 4;

class TileBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.score = 0;

    const styles = document.createElement('style');
    const board = document.createElement('div');

    styles.innerHTML = `
      div {
        background-color: lightblue;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(${rowsTall}, 1fr);
        height: 100%;
        padding: 2px;
        row-gap: 2px;
        width: 100%:
      }
    `;

    const gameOver = new CustomEvent('game-over', {
      bubbles: true
    });
    const currBoard = this;
    for (let i = 0; i < rowsTall; i++) {
      const newRow = document.createElement('tile-row');
      newRow.addEventListener('new-row', () => {
        moveRowBoards(currBoard, newRow);
      });
      newRow.addEventListener('game-over', () => {
        currBoard.score = 0;
        currBoard.dispatchEvent(gameOver);
      });
      if (i == rowsTall - 1) newRow.setBottomRow();
      board.append(newRow);
    }

    this.shadowRoot.append(styles, board);
  }
}

function moveRowBoards(currBoard, newRow) {
  currBoard.score += 1;
  const scoreUpdate = new CustomEvent('score-update', {
    bubbles: true,
    detail: {
      score: currBoard.score
    }
  });
  currBoard.dispatchEvent(scoreUpdate);
  
  newRow.remove();
  const topRow = document.createElement('tile-row');
  topRow.addEventListener('new-row', () => {
    moveRowBoards(currBoard, topRow);
  });

  const gameOver = new CustomEvent('game-over', {
    bubbles: true
  });
  topRow.addEventListener('game-over', () => {
    currBoard.score = 0;
    currBoard.dispatchEvent(gameOver);
  });
  currBoard.shadowRoot.querySelector('div').insertAdjacentElement('afterbegin', topRow);
  currBoard.shadowRoot.querySelector('tile-row:last-child').setBottomRow();
}

customElements.define('tile-board', TileBoard);