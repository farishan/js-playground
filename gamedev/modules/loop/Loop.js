function Loop(autostart, defaultFps = 5, debuggerDom) {
  var shouldRun = autostart ? true : false;
  var frameCount = 0;
  var $results = debuggerDom;

  var fpsInterval, startTime, now, then, elapsed;
  var listeners = [];

  start(defaultFps);

  function start(fps) {
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    startTime = then;
    run();
  }

  function run(newtime) {
    if (!shouldRun) return;

    requestAnimationFrame(run);

    // calc elapsed time since last loop
    now = newtime;
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
      // Get ready for next frame by setting then=now, but...
      // Also, adjust for fpsInterval not being multiple of 16.67
      then = now - (elapsed % fpsInterval);

      // draw stuff here
      for (let index = 0; index < listeners.length; index++) {
        listeners[index]();
      }

      // TESTING...Report #seconds since start and achieved fps.
      if ($results && $results !== null) {
        var sinceStart = now - startTime;
        var currentFps =
          Math.round((1000 / (sinceStart / ++frameCount)) * 100) / 100;
        $results.innerHTML = `Elapsed time: ${
          Math.round((sinceStart / 1000) * 100) / 100
        }s @ ${currentFps}fps`;
      }
    }
  }

  this.addListener = function (fn) {
    listeners.push(fn);
  };

  this.stop = function () {
    shouldRun = false;
  };

  this.getFrameCount = function () {
    return frameCount;
  };

  return this;
}
