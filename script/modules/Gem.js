export default class Gem {
  constructor(cell, game) {
    this.game = game;
    this.cell = cell;
    this.image = '../img/gem.png';

    this.elem = document.createElement('img');
    this.elem.src = this.image;
    this.elem.style.width = "45px";
    this.elem.style.height = "45px";
    this.elem.style.cursor = "pointer";
    this.elem.style.userSelect = "none";

    let colors = [0, 72, 144, 216, 288];
    this.color = colors[Math.floor(Math.random()*colors.length)];
    this.elem.style.filter = `hue-rotate(${this.color}deg)`;
    cell.elem.append(this.elem);
  }

  remove() {
    this.elem.remove();
    delete this;
  }

  // switch(newGem) {
  //   let oldCell = this.cell.elem;
  //   let newCell = this.game.getCell(newGem.cell.x, newGem.cell.y);
  //   let oldX = this.x;
  //   let oldY = this.y;
  //   this.x = newGem.x;
  //   this.y = newGem.y;
  //   newGem.x = oldX;
  //   newGem.y = oldY;
  //   newCell.append(this.elem);
  //   oldCell.append(newGem.elem);
  // }



}