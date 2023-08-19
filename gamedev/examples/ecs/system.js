require(['generate-all-option', 'world'], function (generateAllOption, World) {
  const world = new World();

  const $systemSelect = el('systemSelect');
  const $addSystem = el('addSystem');
  const $removeSystem = el('removeSystem');
  const $turnOnButton = el('turnOnButton');
  const $turnOffButton = el('turnOffButton');
  const $toggleButton = el('toggleButton');

  /* Define systems */
  const SYSTEM_MAP = {
    move: function (entity) {
      if (!entity.distance && entity.distance !== null) return;

      if (entity.shouldMove) {
        if (entity.distance === null) entity.distance = 0;

        entity.distance++;
      }
    },
    randomMove: function (entity) {
      if (entity.x === null) {
        entity.x = 1;
      }

      if (entity.y === null) {
        entity.y = 1;
      }

      if (!entity.x || !entity.y) return;

      entity.x = Math.floor(Math.random() * 1000);
      entity.y = Math.floor(Math.random() * 1000);
    }
  };
  function generateSystems() {
    for (const [key, value] of Object.entries(SYSTEM_MAP)) {
      world.ecs.addSystem(key, value);
    }
  }
  generateSystems();

  $addSystem.onclick = function () {
    if ($systemSelect.value === '*') {
      generateSystems();
      world.draw();
      return;
    }

    world.ecs.addSystem($systemSelect.value, function (entity) {
      if (!entity.distance && entity.distance !== null) return;

      if (entity.shouldMove) {
        if (entity.distance === null) entity.distance = 0;

        entity.distance++;
      }
    });
    world.draw();
  };

  $removeSystem.onclick = function () {
    world.ecs.removeSystem($systemSelect.value);
    world.draw();
  };

  $turnOnButton.onclick = function () {
    world.ecs.activate($systemSelect.value);
    world.draw();
  };
  $turnOffButton.onclick = function () {
    world.ecs.deactivate($systemSelect.value);
    world.draw();
  };
  $toggleButton.onclick = function () {
    world.ecs.toggle($systemSelect.value);
    world.draw();
  };

  world.addListener(function () {
    $systemSelect.innerHTML = '';
    $systemSelect.appendChild(generateAllOption());
    for (const key of Object.keys(SYSTEM_MAP)) {
      const option = document.createElement('option');
      option.innerHTML = key;
      $systemSelect.appendChild(option);
    }
  });

  world.draw();
});
