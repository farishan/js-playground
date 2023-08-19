define([
  '../../../lib/get-unique-color-id.js',
  '../../modules/ecs/ECS.js'
], function (getUniqueColorId, ECS) {
  function World() {
    const self = this;
    const $monitor = el('monitor');

    const listeners = [];
    this.ecs = new ECS(getUniqueColorId);

    this.addListener = (fn) => listeners.push(fn);

    this.draw = function () {
      $monitor.innerHTML = `<pre><code>${JSON.stringify(self.ecs, '', 2)}</code></pre>`;
      listeners.forEach((fn) => fn());
    };

    this.draw();
  }

  return World;
});
