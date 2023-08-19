/* import GRID_SIZE, GRID_GAP from config.js */

function Vector2D(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

Vector2D.prototype.calculate = function (key) {
  const newX = this.x * GRID_SIZE + this.x * GRID_GAP;
  const newY = this.y * GRID_SIZE + this.y * GRID_GAP;

  if (key === 'x') return newX;
  else if (key === 'y') return newY;
  else
    return {
      x: newX,
      y: newY
    };
};

Vector2D.prototype.getDirection = function (target) {
  const { x: x1, y: y1 } = this;
  const { x: x2, y: y2 } = target;

  const distanceX = x2 - x1;
  const distanceY = y2 - y1;

  if (distanceX === 0 && distanceY === 0) return;

  let direction = '';

  if (distanceY !== 0) {
    if (distanceY > 0) {
      direction += 'S';
    } else {
      direction += 'N';
    }
  }

  if (distanceX !== 0) {
    if (distanceX > 0) {
      direction += 'E';
    } else {
      direction += 'W';
    }
  }

  return direction;
};
