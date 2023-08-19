function Canvas(dom) {
  this.dom = dom || null;
  this.context = null;

  if (dom && dom !== null) {
    this.context = dom.getContext('2d');
  }
}

/**
 *
 * @param {DOM} d canvas dom
 * @param {int} gz gridsize
 * @param {int} cl gridmap column length
 * @param {int} rl gridmap row length
 * @param {string} c colorhex #xxx
 */
Canvas.renderGridToCanvas = function (
  d = document.createElement('canvas'),
  gz = 0,
  cl = 0,
  rl = 0,
  c
) {
  const ctx = d.getContext('2d');
  const rc = () => Math.floor(Math.random() * 9);

  for (let row = 0; row < rl; row++) {
    for (let col = 0; col < cl; col++) {
      ctx.fillStyle = c ? c : `#${rc()}${rc()}${rc()}`;
      ctx.fillRect(col * gz, row * gz, gz, gz);
    }
  }
};

Canvas.pixelCoordinateToGridCoordinate = function (x, y, gridSize) {
  const gridX = Math.floor(x / gridSize);
  const gridY = Math.floor(y / gridSize);
  return [gridX, gridY];
};
