function LoopEngine(options = {}) {
    const self = this

    this.should_stop = false
    this.frame_count = 0
    this.fps = options.fps || 5
    this.fps_interval = 0
    this.start_time = 0
    this.now = 0
    this.then = 0
    this.elapsed = 0
    this.$results = document.createElement('div')

    this.start = function () {
        self.should_stop = false
        self.fps_interval = 1000 / self.fps
        self.then = performance.now()
        self.start_time = self.then
        self.$results.innerHTML = 'started'

        function loop() {
            if (self.should_stop) return
            requestAnimationFrame(loop)

            self.now = performance.now()
            self.elapsed = self.now - self.then

            if (self.elapsed > self.fps_interval) {
                self.then = self.now - (self.elapsed % self.fps_interval);

                if (options.onTick) options.onTick()

                var sinceStart = self.now - self.start_time;
                var currentFps = Math.round(1000 / (sinceStart / ++self.frame_count) * 100) / 100;
                self.$results.innerHTML = "Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.";
            }
        }

        loop()
    }

    this.stop = function () {
        self.should_stop = true
    }

    this.render = function (parent) {
        parent.appendChild(this.$results)
    }
}
