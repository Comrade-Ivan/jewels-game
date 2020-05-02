import Cell from './Cell.js';

export default class Game {
  constructor(elem) {
    this._elem = elem;
    this.score = 0;
    this._field = [];
    this.options = {
      width: 7,
      height: 7,
    };
  }

  getCell(x, y) {
    for(let rows of this._field) {
      for(let cell of rows) {
        if(cell.x == x && cell.y == y) {
          return cell;
        }
      }
    }
    return null;
  }

  start() {
    for (let i = 0; i < this.options.height; i++) {
      let row = document.createElement('div');
      row.style.display = "flex";
      row.style.justifyContent = "center";
      let rowArray = [];
      for (let j = 0; j < this.options.width; j++) {
        let cell = new Cell(i, j, row, this);
        rowArray.push(cell);
      }
      this._elem.append(row);
      this._field.push(rowArray);
    }
    console.log(this._field);
  }

  refresh() {
    let gemsToDelete = [];
    for(let row of this._field) {
      for (let cell of row) {
        if(this.getSameGems(cell)) {
          gemsToDelete.push(this.getSameGems(cell));
        }
      }
    }
    console.log(gemsToDelete);
    for(let i = 0; i < gemsToDelete.length; i++) {
      let cells = gemsToDelete[i];
      this.score += cells.length*10;
      setTimeout(() => {
        for(let cell of cells) {
          cell.gem.remove();
        }
      }, 1000*i);
    }
    console.log(this.score);
  }

  getSameGems(cell) {
    let directions = {
      left : cell.x,
      right : this.options.width - cell.x,
      top : cell.y,
      bottom : this.options.height - cell.y,
    }
    let sameGems = [];
    
    for(let direction in directions) {
      let nextCell = cell;
      for(let i = 0; i < directions[direction]; i++) {
        if(nextCell.getCellByDirection(direction) == null || nextCell.getCellByDirection(direction).gem.color != cell.gem.color) {
          break;
        }
        nextCell = nextCell.getCellByDirection(direction);
        sameGems.push(nextCell);
      }
    }

    if(sameGems.length > 1) {
      sameGems.push(cell);
      return sameGems;
    } else return false;

  }

}