function update() {
    if (direction === 'right') {
        x += SNAKE_PART_WIDTH
    }
    else if (direction === 'left') {
        x -= SNAKE_PART_WIDTH
    }
    else if (direction === 'up') {
        y -= SNAKE_PART_WIDTH
    }
    else if (direction === 'down') {
        y += SNAKE_PART_WIDTH
    }

    if (x >= CANVAS_WIDTH) {
        console.log('dead')
        loopEngine.stop()
        loopEngine1.stop()
        x = CANVAS_WIDTH - SNAKE_PART_WIDTH
    } else if (x < 0) {
        loopEngine.stop()
        loopEngine1.stop()
        x = 0
    } else if (y < 0) {
        loopEngine.stop()
        loopEngine1.stop()
        y = 0
    } else if (y >= CANVAS_HEIGHT) {
        loopEngine.stop()
        loopEngine1.stop()
        y = CANVAS_HEIGHT - SNAKE_PART_HEIGHT
    }
}

function render() {
    canvasContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    canvasContext.fillRect(x, y, SNAKE_PART_WIDTH, SNAKE_PART_HEIGHT)
}

// @see http://jsfiddle.net/m1erickson/CtsY3/
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

const loopEngine = new LoopEngine({ fps: 10, onTick: update })
const loopEngine1 = new LoopEngine({ fps: 100, onTick: render })

document.body.appendChild(loopEngine.$results)
document.body.appendChild(loopEngine1.$results)