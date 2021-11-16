// TileSquare.js

class TileSquare extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.black = false;
    this.bottomRow = false;

    const styles = document.createElement('style');
    const tile = document.createElement('div');

    styles.innerHTML = `
      div {
        background-color: white;
        border-radius: 4px;
        height: 100%;
        width: 100%;
      }

      div.gray {
        background-color: #777 !important;
      }

      div.black {
        background-color: black;
      }

      div:hover {
        cursor: pointer;
      }
    `;

    const newRowEvent = new CustomEvent('new-row', {
      bubbles: true
    });
    const gameOver = new CustomEvent('game-over', {
      bubbles: true
    });
    const currTile = this;
    this.addEventListener('click', e => {
      if (this.black && this.bottomRow) {
        currTile.dispatchEvent(newRowEvent);
      } else {
        currTile.dispatchEvent(gameOver);
      }
    });

    this.shadowRoot.append(styles, tile);
  }

  setBlack() {
    this.black = true;
    this.shadowRoot.querySelector('div').classList.add('black');
    if (this.bottomRow) {
      this.shadowRoot.querySelector('div').classList.add('gray');
    }
  }

  setBottomRow() {
    this.bottomRow = true;
    if (this.black) {
      this.shadowRoot.querySelector('div').classList.add('gray');
    }
  }
}

customElements.define('tile-square', TileSquare);