// import TPS from config

const gameLoop = {
  game: null,
  isRunning: false,
  id: 'gameLoop',
  tps: TPS,
  start: function () {
    if (this.isRunning === false) {
      const self = this;
      this.isRunning = true;

      let tpsInterval = 1000 / this.tps,
        tick = 0,
        then = performance.now(),
        now,
        elapsed;

      function loop() {
        if (self.isRunning) {
          requestAnimationFrame(loop);
        }

        now = Date.now();
        elapsed = now - then;

        // if enough time has elapsed, draw the next frame
        if (elapsed > tpsInterval) {
          // Get ready for next frame by setting then=now, but also adjust for your
          // specified tpsInterval not being a multiple of RAF's interval (16.7ms)
          then = now - (elapsed % tpsInterval);

          // Put your drawing code here
          if (self.game.shouldUpdate) self.game.update();
        }
      }

      loop();
    }
  },
  stop: function () {
    cancelAnimationFrame(this.id);
    this.isRunning = false;
  }
};
