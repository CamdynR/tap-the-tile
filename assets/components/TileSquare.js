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
    const currTile = this;
    this.addEventListener('click', e => {
      if (this.black && this.bottomRow) {
        currTile.dispatchEvent(newRowEvent);
      }
    });

    this.shadowRoot.append(styles, tile);
  }

  setBlack() {
    this.black = true;
    this.shadowRoot.querySelector('div').classList.add('black');
  }
}

customElements.define('tile-square', TileSquare);