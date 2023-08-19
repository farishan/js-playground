function Gridline(x = 0, y = 0, width = 0, height = 0, color = '#000') {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;

  return this;
}

/**
 *
 * @param {*} options
  ```
  {
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.horizontalLineCount = options.horizontalLineCount || 0;
    this.verticalLineCount = options.verticalLineCount || 0;
    this.gridSize = options.gridSize || 0;
    this.lineWidth = options.lineWidth || 0.5; //px
    this.lineColor = options.lineColor || '#000';
    this.fitWidth = options.fitWidth || false;
    this.fitHeight = options.fitHeight || false;
    this.withTrailingLine =
      options.withTrailingLine === undefined ? true : options.withTrailingLine;
  }
  ```
 * @returns `Grid` instance
 */
function Grid(options = {}) {
  const self = this;
  this.width = options.width || 0;
  this.height = options.height || 0;
  this.horizontalLineCount = options.horizontalLineCount || 0;
  this.verticalLineCount = options.verticalLineCount || 0;
  this.gridSize = options.gridSize || 0;
  this.lineWidth = options.lineWidth || 0.5; //px
  this.lineColor = options.lineColor || '#000';
  this.fitWidth = options.fitWidth || false;
  this.fitHeight = options.fitHeight || false;
  this.withTrailingLine =
    options.withTrailingLine === undefined ? true : options.withTrailingLine;

  this.lines = [];

  if (this.width && this.height && this.gridSize) {
    /* render by grid size */
    const horizontalLineCount = this.height / this.gridSize;
    generateHorizontalLines(
      horizontalLineCount,
      this.width,
      this.height,
      this.gridSize
    );

    const verticalLineCount = this.width / this.gridSize;
    generateVerticalLines(
      verticalLineCount,
      this.width,
      this.height,
      this.gridSize
    );
  } else if (
    this.horizontalLineCount &&
    this.verticalLineCount &&
    this.width &&
    this.height &&
    this.fitWidth &&
    this.fitHeight
  ) {
    generateHorizontalLines(
      this.horizontalLineCount,
      this.width,
      this.height,
      this.height / this.horizontalLineCount
    );
    generateVerticalLines(
      this.verticalLineCount,
      this.width,
      this.height,
      this.width / this.verticalLineCount
    );
  }

  function generateHorizontalLines(qty, width, height, spacing) {
    if (self.withTrailingLine) qty++;
    for (let index = 0; index < qty; index++) {
      const y = index * spacing - self.lineWidth;
      if (y < height) {
        const line = new Gridline(0, y, width, self.lineWidth, self.lineColor);
        line.id = 'h' + index;
        self.lines.push(line);
      }
    }
  }

  function generateVerticalLines(qty, width, height, spacing) {
    if (self.withTrailingLine) qty++;
    for (let index = 0; index < qty; index++) {
      const x = index * spacing - self.lineWidth;
      if (x < width) {
        const line = new Gridline(x, 0, self.lineWidth, height, self.lineColor);
        line.id = 'v' + index;
        self.lines.push(line);
      }
    }
  }
  return this;
}
