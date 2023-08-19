/* import Vector2D from classes */
function Grid(id = 0, x = 0, y = 0, width = 0, height = 0) {
  Vector2D.call(this, x, y);

  this.id = id;
  this.width = width;
  this.height = height;
  // this.color = randomColor();
  this.color = '#333';
  return this;
}
Grid.prototype = Object.assign({}, Vector2D.prototype);
Grid.prototype.constructor = Grid;

Grid.prototype.vectorIsInside = function (vector) {
  return (
    vector.x >= this.x &&
    vector.y >= this.y &&
    vector.x <= this.x + this.width &&
    vector.y <= this.y + this.height
  );
};

Grid.prototype.setColor = function (color) {
  this.color = color;
};

Grid.prototype.getGridCoord = function () {
  const splitted = this.id.split('_');
  return {
    x: parseInt(splitted[0]),
    y: parseInt(splitted[1])
  };
};

function GridManager() {
  const self = this;
  this.grids = [];

  this.generateGrids = function (columnCount, rowCount) {
    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < columnCount; j++) {
        const vec = new Vector2D(j, i);
        const { x, y } = vec.calculate();
        const id = `${j}_${i}`;

        self.grids.push(new Grid(id, x, y, GRID_SIZE, GRID_SIZE));
      }
    }
  };

  this.getGridByCanvasCoord = function (vector) {
    let result = null;

    for (let index = 0; index < self.grids.length; index++) {
      const grid = self.grids[index];
      if (grid.vectorIsInside(vector)) {
        result = grid;
      }
    }

    return result;
  };

  return this;
}
