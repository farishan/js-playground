define(function () {
  'use strict';

  function Rectangle(...args) {
    let opts = args && args.length ? args : [0, 0, 0, 0, '#000'];

    this.x = opts[0];
    this.y = opts[1];
    this.width = opts[2];
    this.height = opts[3];
    this.color = opts[4];
  }

  Rectangle.prototype.getFillRectArgs = function () {
    return [this.x, this.y, this.width, this.height];
  };

  Rectangle.prototype.getTopLeft = function () {
    return { x: this.x, y: this.y };
  };

  Rectangle.prototype.getBottomRight = function () {
    return {
      x: this.x + this.width,
      y: this.y + this.height
    };
  };

  return Rectangle;
});
