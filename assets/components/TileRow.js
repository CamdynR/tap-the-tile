// TileRow.js

const tilesWide = 4;

class TileRow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.tileSelected = Math.floor(Math.random() * (tilesWide));

    const styles = document.createElement('style');
    const row = document.createElement('div');

    styles.innerHTML = `
      div {
        column-gap: 2px;
        display: grid;
        grid-template-columns: repeat(${tilesWide}, 1fr);
        grid-template-rows: 1fr;
        height: 100%;
        width: 100%;
      }
    `;

    const newRowEvent = new CustomEvent('new-row', {
      bubbles: true
    });
    const gameOver = new CustomEvent('game-over', {
      bubbles: true
    });
    const currRow = this;
    for (let i = 0; i < tilesWide; i++) {
      const newTile = document.createElement('tile-square');
      newTile.addEventListener('new-row', e => {
        currRow.dispatchEvent(newRowEvent);
      });
      newTile.addEventListener('game-over', e => {
        currRow.dispatchEvent(gameOver);
      });
      if (i == this.tileSelected) newTile.setBlack();
      row.append(newTile);
    }

    this.shadowRoot.append(styles, row);
  }

  setBottomRow() {
    const squares = Array.from(this.shadowRoot.querySelectorAll('tile-square'));
    squares.forEach(square => {
      square.setBottomRow();
    });
  }
}

customElements.define('tile-row', TileRow);