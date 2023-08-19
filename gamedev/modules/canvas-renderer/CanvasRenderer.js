function CanvasRenderer() {
  this.createDom = function () {
    return document.createElement('canvas');
  };

  this.renderCanvasToDom = function (canvasDom, parentDom) {
    parentDom.appendChild(canvasDom);
  };

  return this;
}
