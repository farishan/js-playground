/*
  for loading tilemap with this following format:

  const mapArray = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ];
*/

function Tilemap2dArray(canvasContext, tileSize = 16, mapArray = [[]]) {
  this.getCanvasWidth = function () {
    return mapArray[0].length * tileSize;
  };

  this.getCanvasHeight = function () {
    return mapArray.length * tileSize;
  };

  this.draw = function (shouldHighlight, highlightColor) {
    for (let row = 0; row < mapArray.length; row++) {
      for (let col = 0; col < mapArray[row].length; col++) {
        const tile = mapArray[row][col];

        if (tile === 0) {
          canvasContext.fillStyle = '#333';
        } else if (tile === 1) {
          canvasContext.fillStyle = 'lightgray';
        }

        if (shouldHighlight(col, row)) {
          canvasContext.fillStyle = highlightColor;
        }

        canvasContext.fillRect(
          col * tileSize,
          row * tileSize,
          tileSize,
          tileSize
        );
      }
    }
  };

  return this;
}
