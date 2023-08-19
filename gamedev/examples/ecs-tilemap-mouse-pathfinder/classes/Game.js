function Game() {
  const self = this;

  this.updateCount = 0;
  this.drawCount = 0;

  this.shouldUpdate = false;
  this.map = null;
  this.setMap = function (map) {
    self.map = map;
  };
  this.getMap = function () {
    return self.map;
  };

  this.update = function () {
    this.updateCount++;
    this.onupdate();
    console.log(this.updateCount);
  };

  this.onupdate = function () {};

  this.draw = function () {
    this.drawCount++;
    self.map.draw();
  };
}
