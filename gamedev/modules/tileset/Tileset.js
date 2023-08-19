function Tileset(tileSize, gap) {
  const self = this;
  this.image = null;
  this.tileSize = tileSize || 0;
  this.columnLength = 0;
  this.rowLength = 0;
  this.gap = gap || 0;
  this.sources = [];
  this.onload = function () {};

  this.loadImage = function (path, callback) {
    const tilesetImage = new Image();
    tilesetImage.src = path;
    tilesetImage.onload = function () {
      const image = tilesetImage;
      self.image = tilesetImage;

      /* Count rows and columns based on image dimension and tileset gap */
      let columnCount = 0;
      let rowCount = 0;
      let currentHeight = 0;
      let currentWidth = 0;

      while (currentWidth < image.width) {
        currentWidth += self.tileSize + self.gap;
        columnCount++;
      }

      while (currentHeight < image.height) {
        currentHeight += self.tileSize + self.gap;
        rowCount++;
      }

      if (
        currentWidth - self.gap !== image.width ||
        currentHeight - self.gap !== image.height
      ) {
        console.error('Someting went wrong.');
      }

      self.columnLength = columnCount;
      self.rowLength = rowCount;

      /* Re-generate self.sources */
      generateSources();

      callback(self);
    };
  };

  function generateSources() {
    let index = 0;

    for (let row = 0; row < self.rowLength; row++) {
      for (let col = 0; col < self.columnLength; col++) {
        self.sources[index] = {
          x: col * self.tileSize + col * self.gap,
          y: row * self.tileSize + row * self.gap
        };

        index++;
      }
    }
  }

  generateSources();
}
