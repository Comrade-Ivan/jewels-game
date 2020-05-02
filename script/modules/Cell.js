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
    this.elem.onclick = () => this.game.selectCell(this);
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
    if (this.gem == null) return;
    this.gem.remove();
    this.gem = null;
  }
  isNear(cell) {
    if(this.x - cell.x <= 1 
      && this.x - cell.x >= -1 
      && this.y - cell.y <= 1 
      && this.y - cell.y >= -1
      ) return true;
    else return false;
  }

  drop(newCell) {
    newCell.elem.append(this.gem.elem);
    newCell.gem = this.gem;
    this.gem = null;
  }
  switchWith(newCell) {
    if( !this.isNear(newCell) ) return;
    let gem = this.gem;
    newCell.elem.append(this.gem.elem);
    this.elem.append(newCell.gem.elem)
    this.gem = newCell.gem;
    newCell.gem = gem;
  }

  createNewGem() {
    this.gem = new Gem(this, this.game)
  }
}

function animate({timing, draw, duration, callback = null}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    draw(progress); // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    } else if (callback != null) {
      callback();
    }

  });
}

function circ(timeFraction) {
  return 1 - Math.sin(Math.acos(timeFraction));
}

function bounce(timeFraction) {
  for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
    }
  }
}