/* How to know tileSize and tileGap:
  1. Open .gal file in Gale.exe
  2. Look at top-left tile
  3. Count tile size manually
  4. Check gap manually
  5. Doesnt need to check all to the right and down
*/
const tileSize = 4;
const tileGap = 1;
const tilesetSource = './tilesets/tileset1/tileset1.png';

const tileset = new Tileset(tileSize, tileGap);

tileset.loadImage(tilesetSource, function () {
  console.log(tileset);
});
