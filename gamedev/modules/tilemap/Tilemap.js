function Tilemap(canvasContext, tileSize, tileSizeModifier) {
  const self = this;
  this.tileSize = tileSize || 0;
  this.tileSizeModifier = tileSizeModifier || 0;
  this.canvasContext = canvasContext || null;
  this.width = 0;
  this.height = 0;
  this.image = null;

  this.tileset = null;
  this.tilesetLoaded = false;

  this.data = null;
  this.dataLoaded = false;

  this.shouldDraw = function () {
    return (
      self.tilesetLoaded &&
      self.dataLoaded &&
      self.canvasContext &&
      self.canvasContext !== null
    );
  };

  this.loadTileset = function (tileset) {
    self.tileset = tileset;
    self.tilesetLoaded = true;

    if (self.shouldDraw()) self.draw();
  };

  this.loadCanvasContext = function (ctx) {
    self.canvasContext = ctx;

    if (self.shouldDraw()) self.draw();
  };

  this.loadData = function (name, data) {
    self.data = data;
    self.dataLoaded = true;

    if (self.shouldDraw()) self.draw();
  };

  this.drawLayer = function (layer) {
    const { width, height, data } = layer;

    let sourceX = 0;
    let sourceY = 0;
    let index = 0;
    let tileValue = 0;

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        tileValue = data[index];

        if (tileValue !== 0) {
          /* Reduce tile value by 1 because Tiles software count from 1 */
          tileValue -= 1;

          sourceX = self.tileset.sources[tileValue].x;
          sourceY = self.tileset.sources[tileValue].y;

          self.canvasContext.drawImage(
            self.tileset.image,
            sourceX,
            sourceY,
            self.tileSize,
            self.tileSize,
            col * self.tileSize * self.tileSizeModifier,
            row * self.tileSize * self.tileSizeModifier,
            self.tileSize * self.tileSizeModifier,
            self.tileSize * self.tileSizeModifier
          );
        }

        index++;
      }
    }
  };

  this.drawLayers = function (layers) {
    for (let index = 0; index < layers.length; index++) {
      const layer = layers[index];
      if (layer.visible) self.drawLayer(layer);
    }
  };

  this.draw = function () {
    const { width, height, layers } = self.data;

    self.width = width;
    self.height = height;

    self.drawLayers(layers);
  };
}

/**
 *
 * @param {DOM} d target dom
 * @param {int} tz tilesize
 * @param {int} cl tilemap column length
 * @param {int} rl tilemap row length
 * @returns {DOM} resized dom
 */
Tilemap.fitDom = function (d, tz = 0, cl = 0, rl = 0) {
  if (!d) throw Error('dom is undefined');

  d.width = cl * tz;
  d.height = rl * tz;
  d.style.width = d.width + 'px';
  d.style.height = d.height + 'px';

  return d;
};
