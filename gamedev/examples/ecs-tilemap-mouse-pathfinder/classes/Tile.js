function Tile(options = {}) {
  this.id = options.id;
  this.initialColor = options.walkable ? '#111' : '#333';
  this.color = options.walkable ? '#111' : '#333';
  this.walkable = options.walkable;
  return this;
}

Tile.prototype.setColor = function (color) {
  this.color = color;
};

Tile.prototype.reset = function () {
  this.color = this.initialColor;
};
