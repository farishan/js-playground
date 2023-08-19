define(function () {
  function System(callback) {
    this.callback = callback;
    this.shouldUpdate = false;
  }

  System.prototype.turnOn = function () {
    this.shouldUpdate = true;
  };

  System.prototype.turnOff = function () {
    this.shouldUpdate = false;
  };

  System.prototype.toggle = function () {
    this.shouldUpdate = !this.shouldUpdate;
  };

  System.prototype.update = function (entity) {
    if (this.callback) this.callback(entity);
  };

  return System;
});
