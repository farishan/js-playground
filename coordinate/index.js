/**
 * Create coordinate object
 * @constructor
 * @param args - 2 numbers, an array of 2 numbers, or an object with `x` and `y` properties
 * @example
 * new Coordinate(5, 7) // x = 5, y = 7
 * new Coordinate([5, 7]) // x = 5, y = 7
 * new Coordinate({x: 5, y: 7}) // x = 5, y = 7
 * @returns {Object} Coordinate object with `x` and `y` properties
 */
function Coordinate(...args) {
  const a = this.adapt(...args);
  this.x = a[0];
  this.y = a[1];
  this.lastX = 0;
  this.lastY = 0;
  this.distance = this.getDistanceFrom();
}

/**
 * Get distance from other coordinate
 * @alias getDistanceFrom
 * @param args - Coordinate object, 2 numbers, an array of 2 numbers, or an object with `x` and `y` properties
 * @example
 * const myCoordinate = new Coordinate()
 * const otherCoordinate = new Coordinate(5, 7)
 * myCoordinate.getDistanceFrom(otherCoordinate)
 * myCoordinate.getDistanceFrom(5, 7)
 * myCoordinate.getDistanceFrom([5, 7])
 * myCoordinate.getDistanceFrom({x: 5, y: 7})
 * @returns {Number} Distance between two coordinates
 */
Coordinate.prototype.getDistanceFrom = function (...args) {
  const n = this.adapt(...args);
  const a = this.x - n[0];
  const b = this.y - n[1];

  return Math.floor(Math.sqrt(a * a + b * b));
};

/**
 * Get `x` position absolute difference
 * @alias getXDistanceFrom
 * @param {Number} n
 * @returns Distance between `x` and `n`
 */
Coordinate.prototype.getXDistanceFrom = function (n = 0) {
  return Math.abs(this.x - n);
};

/**
 * Get `y` position absolute difference
 * @alias getYDistanceFrom
 * @param {Number} n
 * @returns Distance between `y` and `n`
 */
Coordinate.prototype.getYDistanceFrom = function (n = 0) {
  return Math.abs(this.y - n);
};

/**
 * Set new coordinate value
 * @alias set
 * @param args - 2 numbers, an array of 2 numbers, or an object with `x` and `y` properties
 * @example
 * const myCoordinate = new Coordinate()
 * myCoordinate.set(5, 7)
 * myCoordinate.set([5, 7])
 * myCoordinate.set({x: 5, y: 7})
 */
Coordinate.prototype.set = function (...args) {
  const a = this.adapt(...args);
  this.lastX = this.x;
  this.lastY = this.y;
  this.x = a[0];
  this.y = a[1];
  this.resetDistance();
};

/**
 * Set new `x` value
 * @alias setX
 * @param {Number} x - New `x` value
 * @example
 * const myCoordinate = new Coordinate({x: 5, y: 7})
 * myCoordinate.setX(7) // new coordinate: {x: 7, y: 7}
 */
Coordinate.prototype.setX = function (x) {
  if (x) {
    this.lastX = this.x;
    this.x = x;
    this.resetDistance();
  }
};

/**
 * Set new `y` value
 * @alias setY
 * @param {Number} y - New `y` value
 * @example
 * const myCoordinate = new Coordinate({x: 5, y: 7})
 * myCoordinate.setY(5) // new coordinate: {x: 5, y: 5}
 */
Coordinate.prototype.setY = function (y) {
  if (y) {
    this.lastY = this.y;
    this.y = y;
    this.resetDistance();
  }
};

/**
 * Set new distance relative to last `x` and `y` value
 * @alias resetDistance
 */
Coordinate.prototype.resetDistance = function () {
  this.distance = this.getDistanceFrom({ x: this.lastX, y: this.lastY });
};

/**
 * Adapt arguments into an array of number
 * @alias adapt
 * @param args - 2 numbers, an array of 2 numbers, or an object with `x` and `y` properties
 * @example
 * const myCoordinate = new Coordinate()
 * myCoordinate.adapt(5, 7) // return [5, 7]
 * myCoordinate.adapt([5, 7]) // return [5, 7]
 * myCoordinate.adapt({x: 5, y: 7}) // return [5, 7]
 * @returns {Number[]} [`x`, `y`]
 */
Coordinate.prototype.adapt = function (...args) {
  if (args && args.length === 2) {
    return [args[0], args[1]];
  } else if (args && args.length === 1) {
    if (args[0][0] && args[0][1]) {
      return [args[0][0], args[0][1]];
    } else if (args[0].x && args[0].y) {
      return [args[0].x, args[0].y];
    }
  }

  return [0, 0];
};

export default Coordinate;
