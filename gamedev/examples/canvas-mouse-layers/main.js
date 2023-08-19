const gridSize = 16;
const gridColumnLength = 8;
const gridRowLength = 6;

function CanvasContainer(domModifier) {
  let dom = document.createElement('div');
  if (domModifier) {
    dom = domModifier(dom);
  }
  dom.style.position = 'relative';

  dom.addCanvas = function (canvasDom, zIndex) {
    canvasDom.style.position = 'absolute';
    canvasDom.style.left = '0';
    canvasDom.style.top = '0';
    canvasDom.style.zIndex = zIndex;
    dom.appendChild(canvasDom);
  };

  dom.addCanvases = function (canvasDoms) {
    canvasDoms.forEach((canvasDom, index) => {
      dom.addCanvas(canvasDom, index);
    });
  };

  return dom;
}

function MultilayerCanvas(
  gridSize = 0,
  gridColumnLength = 0,
  gridRowLength = 0
) {
  const self = this;
  this.gridSize = gridSize;
  this.gridColumnLength = gridColumnLength;
  this.gridRowLength = gridRowLength;

  this.createContainer = function () {
    return CanvasContainer(function (dom) {
      return DomGrid.resizeDomByGrid(
        dom,
        self.gridSize,
        self.gridColumnLength,
        self.gridRowLength
      );
    });
  };

  this.createCanvas = function (domModifier) {
    let dom = document.createElement('canvas');
    if (domModifier) {
      dom = domModifier(dom);
    }

    dom.clear = function () {
      dom
        .getContext('2d')
        .clearRect(
          0,
          0,
          self.gridSize * self.gridColumnLength,
          self.gridSize * self.gridRowLength
        );
    };

    dom.drawRect = function (...args) {
      dom.getContext('2d').fillRect(...args);
    };

    return dom;
  };
}

const multilayerCanvas = new MultilayerCanvas(
  gridSize,
  gridColumnLength,
  gridRowLength
);

function CanvasGridManager() {
  this.name = 'CanvasGridManager';
  return this;
}

/**
 *
 * @param {DOM} d canvas dom
 * @param {int} gz gridsize
 * @param {int} cl gridmap column length
 * @param {int} rl gridmap row length
 * @param {string} c colorhex #xxx
 */
CanvasGridManager.renderGridToCanvas = function (
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

const canvasContainer = multilayerCanvas.createContainer();

const backgroundCanvas = multilayerCanvas.createCanvas(function (dom) {
  return DomGrid.resizeDomByGrid(
    dom,
    gridSize,
    gridColumnLength,
    gridRowLength
  );
});

CanvasGridManager.renderGridToCanvas(
  backgroundCanvas,
  gridSize,
  gridColumnLength,
  gridRowLength
);

const interactionCanvas = multilayerCanvas.createCanvas(function (dom) {
  return DomGrid.resizeDomByGrid(
    dom,
    gridSize,
    gridColumnLength,
    gridRowLength
  );
});

interactionCanvas.onclick = function (e) {
  const { offsetX, offsetY } = e;
  const [x, y] = Canvas.pixelCoordinateToGridCoordinate(
    offsetX,
    offsetY,
    gridSize
  );

  e.target.style.opacity = '0.7';

  e.target.clear();
  e.target.getContext('2d').fillStyle = 'yellow';
  e.target.drawRect(x * gridSize, y * gridSize, gridSize, gridSize);
};

canvasContainer.addCanvases([backgroundCanvas, interactionCanvas]);

document.getElementById('root').appendChild(canvasContainer);
