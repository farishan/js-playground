const $canvas = document.getElementById('canvas');
const context = $canvas.getContext('2d');
context.imageSmoothingEnabled = false;

const tileSize = 4;
const tileSizeModifier = 2;
const tilesetGap = 1;
const tilesetSource = '../../modules/tileset/tilesets/tileset1/tileset1.png';

const tilemap = new Tilemap(context, tileSize, tileSizeModifier);
const tileset = new Tileset(tileSize, tilesetGap);

tileset.loadImage(tilesetSource, function () {
  tilemap.loadTileset(tileset);
});
