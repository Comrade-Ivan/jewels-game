import Gem from './Gem.js';

export default class Cell {
  constructor(x, y, row, game) {
    this.x = x;
    this.y = y;
    this.game = game;
    this.elem = document.createElement('div');
    this.elem.classList.add("cell");
    row.append(this.elem);
    this.gem = new Gem(this, game);
  }

  getCellByDirection(direction) {
    switch(direction) {
      case 'top':
        return this.game.getCell(this.x, this.y - 1);
      case 'bottom':
        return this.game.getCell(this.x, this.y + 1);
      case 'left':
        return this.game.getCell(this.x - 1, this.y);
      case 'right':
        return this.game.getCell(this.x + 1, this.y);
    }
  }

  isEmpty() {
    if (this.gem == null) return true;
    else return false;
  }

  clear() {
    this.gem.remove();
    this.gem = null;
  }
}