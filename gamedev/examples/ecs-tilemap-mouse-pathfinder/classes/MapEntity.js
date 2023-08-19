let MapEntityId = 0;

function MapEntity(x, y, width, height, color) {
  this.id = MapEntityId++;
  this.x = x; // tile
  this.y = y; // tile
  this.width = width; // tile
  this.height = height; // tile
  this.color = color;

  return this;
}
