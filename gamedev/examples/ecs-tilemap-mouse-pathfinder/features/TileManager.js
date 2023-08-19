function TileManager() {
  this.tiles = [];
}

TileManager.prototype.loadTiles = function (tiles, grids) {
  let result = [];

  for (let index = 0; index < grids.length; index++) {
    const grid = grids[index];

    if (tiles[index] > 0) {
      result.push(new Tile({ id: grid.id, walkable: true }));
    } else {
      result.push(new Tile({ id: grid.id }));
    }
  }

  this.tiles = result;
  return result;
};

TileManager.prototype.generateTilesFromGrids = function (grids) {
  let result = [];

  for (let index = 0; index < grids.length; index++) {
    const grid = grids[index];

    if (Math.random() > 0.2) {
      result.push(new Tile({ id: grid.id, walkable: true }));
    } else {
      result.push(new Tile({ id: grid.id }));
    }
  }

  this.tiles = result;
  return result;
};

TileManager.prototype.getTileById = function (id) {
  return this.tiles.find((t) => t.id === id);
};

TileManager.prototype.getWalkableNeighbors = function (tile, direction) {
  let walkableNeighbors = [];
  const { x, y } = idToCoord(tile.id);

  let neighborId, neighbor;

  if (direction.includes('N')) {
    neighborId = `${x}_${y - 1}`;
  } else if (direction.includes('S')) {
    neighborId = `${x}_${y + 1}`;
  }

  check();

  if (direction.includes('W')) {
    neighborId = `${x - 1}_${y}`;
  } else if (direction.includes('E')) {
    neighborId = `${x + 1}_${y}`;
  }

  check();

  function check() {
    if (neighborId) {
      neighbor = this.getTileById(neighborId);
      if (neighbor.walkable) {
        walkableNeighbors.push(neighbor);
        neighbor = undefined;
      }

      neighborId = undefined;
    }
  }

  return walkableNeighbors;
};
