const tileSize = 4;
const tileGap = 1;

const tileset = new Tileset(tileSize, tileGap);
tileset.loadImage(
  '../../modules/tileset/tilesets/tileset1/tileset1.png',
  function () {
    /* canvas rendering example */
    const $canvas = document.getElementById('canvas');
    const context = $canvas.getContext('2d');

    for (let index = 0; index < tileset.sources.length; index++) {
      const source = tileset.sources[index];

      context.drawImage(
        tileset.image,
        /* Tile in tileset */
        source.x,
        source.y,
        tileSize,
        tileSize,
        /* Tile in canvas*/
        source.x,
        source.y,
        tileSize,
        tileSize
      );
    }
  }
);
