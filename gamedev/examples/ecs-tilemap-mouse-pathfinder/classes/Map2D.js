/* import GRID_SIZE, GRID_GAP from config.js */
/* import randomColor from helpers.js */
/* import Vector2D, GridManager, Canvas from classes */

function Map2D(canvas, width = 2, height = 2, tiles) {
  const self = this;

  this.canvas = new Canvas(canvas, width, height);
  this.gridManager = new GridManager();
  this.tileManager = new TileManager();
  this.lastHighlighted = null;
  this.entities = [];

  function drawEntitites() {
    for (let index = 0; index < self.entities.length; index++) {
      const entity = self.entities[index];
      const vec = new Vector2D(entity.x, entity.y);
      const { x, y } = vec.calculate();

      self.canvas.drawRect(
        x,
        y,
        entity.width * GRID_SIZE + GRID_GAP * (entity.width - 1),
        entity.height * GRID_SIZE + GRID_GAP * (entity.height - 1),
        entity.color
      );
    }
  }

  this.setClickListener = function (fn) {
    self.canvas.setClickListener(fn);
  };

  this.setAltClickListener = function (fn) {
    self.canvas.setAltClickListener(fn);
  };

  this.init = function () {
    self.gridManager.generateGrids(width, height);

    if (tiles) {
      self.tileManager.loadTiles(tiles, self.gridManager.grids);
    } else {
      self.tileManager.generateTilesFromGrids(self.gridManager.grids);
    }
  };

  this.draw = function () {
    console.log('map draw')
    self.canvas.clear();

    /* Draw grids */
    // for (let index = 0; index < self.gridManager.grids.length; index++) {
    //   const grid = self.gridManager.grids[index];
    //   self.canvas.drawRect(grid.x, grid.y, grid.width, grid.height, grid.color);
    // }

    /* Draw tiles */
    const tiles = this.tileManager.tiles;
    for (let index = 0; index < self.gridManager.grids.length; index++) {
      const grid = self.gridManager.grids[index];
      const tile = tiles[index];

      if (tile !== null) {
        self.canvas.drawRect(
          grid.x,
          grid.y,
          grid.width,
          grid.height,
          tile.color
        );
      }
    }

    /* Draw entities */
    /* @TODO draw grid entities and canvas entities, or implement multilayer canvas */
    drawEntitites();
  };
}

Map2D.prototype.addEntity = function (entity) {
  this.entities.push(entity);
};

Map2D.prototype.removeEntity = function (entity) {
  this.entities = this.entities.filter((e) => e.id !== entity.id);
};

Map2D.prototype.drawPath = function (start, end) {
  const self = this;

  const direction = start.getDirection(end);
  const grids = this.gridManager.grids;

  let initialDistanceX = end.x - start.x;
  let initialDistanceY = end.y - start.y;
  let distanceX = end.x - start.x;
  let distanceY = end.y - start.y;

  let finish = false;

  function runY() {
    if (distanceY > 0) {
      distanceY--;
    } else if (distanceY < 0) {
      distanceY++;
    } else {
    }
  }

  function runX() {
    if (distanceX > 0) {
      distanceX--;
    } else if (distanceX < 0) {
      distanceX++;
    } else {
    }
  }

  function loop() {
    if (finish) return;

    let currentGrid = undefined;

    const percentX = (distanceX / initialDistanceX).toFixed(1);
    const percentY = (distanceY / initialDistanceY).toFixed(1);

    if (isNaN(percentX) || isNaN(percentY) || percentY === percentX) {
      runY();
      runX();
    } else if (percentY > percentX) {
      runY();
    } else if (percentX > percentY) {
      runX();
    }

    currentGrid = grids.find(
      (g) =>
        g.id ==
        `${start.x + (initialDistanceX - distanceX)}_${
          start.y + (initialDistanceY - distanceY)
        }`
    );

    if (currentGrid) {
      const currentTile = self.tileManager.getTileById(currentGrid.id);

      if (!currentTile.walkable) {
        currentTile.setColor('red');
        const walkableNeighbors = currentTile.getWalkableNeighbors(direction);

        const shouldContinue = walkableNeighbors.length > 0;

        if (shouldContinue) {
          /* @TODO what? */
        } else {
          finish = true;
        }
      } else {
        currentTile.setColor('lightgray');
      }
    }

    if (distanceX === 0 && distanceY === 0) {
      finish = true;
    }

    self.draw();

    setTimeout(() => {
      loop();
    }, 100);
  }

  loop();
};

Map2D.prototype.highlight = function (vector, color) {
  if (this.lastHighlighted !== null) {
    this.lastHighlighted.reset();
  }

  const tile = this.tileManager.getTileById(`${vector.x}_${vector.y}`);
  if (!tile || tile === null) return;

  this.lastHighlighted = tile;
  tile.setColor(color);
  this.draw();
};

Map2D.prototype.getClickedTile = function (canvasVector) {
  const clickedGrid = this.gridManager.getGridByCanvasCoord(canvasVector);
  if (!clickedGrid || clickedGrid === null) return false;

  const clickedTile = this.tileManager.getTileById(clickedGrid.id);
  if (!clickedTile || clickedTile === null) return false;

  return { ...clickedTile, x: clickedGrid.x, y: clickedGrid.y };
};

Map2D.prototype.getClickedGrid = function (canvasVector) {
  return this.gridManager.getGridByCanvasCoord(canvasVector);
};

Map2D.prototype.getClickedEntities = function (canvasVector) {
  const clickedGrid = this.getClickedGrid(canvasVector);
  const { x, y } = clickedGrid.getGridCoord();

  return this.entities.filter((e) => e.x === x && e.y === y);
};
