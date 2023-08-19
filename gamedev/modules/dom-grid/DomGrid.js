function DomGrid(gridSize = 0) {
  this.gridSize = gridSize;
  return this;
}

/**
 *
 * @param {DOM} d target dom
 * @param {int} gz gridSize
 * @param {int} cl gridmap column length
 * @param {int} rl gridmap row length
 * @returns {DOM} resized dom
 */
DomGrid.resizeDomByGrid = function (d, gz = 0, cl = 0, rl = 0) {
  if (!d) throw Error('dom is undefined');

  d.width = cl * gz;
  d.height = rl * gz;
  d.style.width = d.width + 'px';
  d.style.height = d.height + 'px';

  return d;
};