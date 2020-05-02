import Cell from './Cell.js';

export default class Game {
  constructor(elem) {
    this._elem = elem;
    this.score = 0;
    this._field = [];
    this.cellsSelected = {old: null, new: null};
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
        let cell = new Cell(j, i, row, this);
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
        if(this.getSameGems(cell).length > 0) {
          gemsToDelete.push(this.getSameGems(cell));
        }
      }
    }
    if(gemsToDelete.length == 0) return;
    for (let i = 0; i < gemsToDelete.length; i++) {
      this.score += gemsToDelete[i].length*10;
      setTimeout(() => {
        for(let cells of gemsToDelete[i]) {
          for(let cell of cells) {
            cell.clear();
          }
        }
      }, 100*i)
    }
    setTimeout(() => this.dropGems(), 100*gemsToDelete.length)
    console.log(this.score);
  }

  dropGems() {
    for (let row of this._field) {
      for(let cell of row) { 
        if (cell.isEmpty()) { 
          let upperCell = cell.getCellByDirection("top");
          if (upperCell && !upperCell.isEmpty()) {
            console.log(upperCell.isEmpty());
            upperCell.drop(cell);
          }
        }
      }
    }
    if(!this.checkFieldFullfilled()) {
      this.createGemRow();
      return setTimeout(this.dropGems.bind(this), 100);
    } else {
      return setTimeout(this.refresh.bind(this), 100);
    }
  }

  createGemRow() {
    for(let cell of this._field[0]) {
      if(cell.isEmpty()) {
        cell.createNewGem();
      }
    }
  }

  checkFieldFullfilled() {
    for(let row of this._field) {
      for(let cell of row) {
        if(cell.isEmpty()) {
          return false;
        }
      }
    }
    return true;
  }

  getSameGems(cell) {
    let directions = {
      left : cell.x,
      right : this.options.width - cell.x,
      top : cell.y,
      bottom : this.options.height - cell.y,
    }
    let sameGems = {};
    
    for(let direction in directions) {
      let nextCell = cell;
      let sameGemsInDirection = [];
      for(let i = 0; i < directions[direction]; i++) {
        if(nextCell.getCellByDirection(direction) == null || nextCell.getCellByDirection(direction).gem.color != cell.gem.color) {
          break;
        }
        nextCell = nextCell.getCellByDirection(direction);
        sameGemsInDirection.push(nextCell);
      }
      sameGems[direction] = sameGemsInDirection;
    }
    let row = sameGems.left.concat(sameGems.right);
    let col = sameGems.top.concat(sameGems.bottom);
    let result = [];

    if (row.length > 1) {
      row.push(cell);
      result.push(row);
    }
    if (col.length > 1) {
      col.push(cell);
      result.push(col);
    }
    return result;

  }

  selectCell(cell) {
    if (this.cellsSelected.old == null) {
      this.cellsSelected.old = cell;
    } else if (this.cellsSelected.new == null) {
      if(this.cellsSelected.old == cell ) {
        this.cellsSelected.old = null;
        return;
      }
      this.cellsSelected.new = cell;
      this.cellsSelected.old.switchWith(this.cellsSelected.new);
      if(this.getSameGems(this.cellsSelected.new).length == 0) {
          this.cellsSelected.new.switchWith(this.cellsSelected.old);
      }
      this.cellsSelected.old = null;
      this.cellsSelected.new = null;
      this.refresh();
    }
  }

}