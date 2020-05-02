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
    this.elem.style.filter = `hue-rotate(${this.color}deg) contrast(200%)`;
    this.elem.style.transition = 'top 100ms';
    cell.elem.append(this.elem);
    this.elem.opacity = 0;
    animate.call(this,{
      timing: circ,
      duration: 100,
      draw: (progress) => {
        this.elem.style.opacity = 100*progress + "%";
      }
    })
  }

  remove() {
    animate.call(this, {
      timing: circ,
      duration: 100,
      draw: (progress) => {
        this.elem.style.opacity = 100 - 100*progress + "%"
      },
      callback: () => {
        this.elem.remove();
        delete this;
      },

    })
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