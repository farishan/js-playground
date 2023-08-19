function Canvas(dom, width, height) {
  const self = this;
  this.dom = dom;
  this.dom.width = width * GRID_SIZE + (width - 1) * GRID_GAP;
  this.dom.height = height * GRID_SIZE + (height - 1) * GRID_GAP;
  this.ctx = dom.getContext('2d');

  this.clickListener = function () {};
  this.dom.onclick = function (e) {
    self.clickListener(e);
  };

  this.altClickListener = function () {};
  this.dom.oncontextmenu = function (e) {
    self.altClickListener(e);
    return false;
  };

  this.drawRect = function (x, y, width, height, color) {
    self.ctx.fillStyle = color;
    self.ctx.fillRect(x, y, width, height);
  };

  return this;
}

Canvas.prototype.setClickListener = function (fn) {
  this.clickListener = fn;
};

Canvas.prototype.setAltClickListener = function (fn) {
  this.altClickListener = fn;
};

Canvas.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.dom.width, this.dom.height);
};
