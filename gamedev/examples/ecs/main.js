require(['../../modules/ecs/ECS'], function (ECS) {
  const $monitor = el('monitor');
  const $addEntity = el('addEntity');
  const $removeEntity = el('removeEntity');
  const $runButton = el('runButton');
  const $entitySelect = el('entitySelect');
  const $componentSelect = el('componentSelect');
  const $systemSelect = el('systemSelect');
  const $addComponent = el('addComponent');
  const $removeComponent = el('removeComponent');
  const $addSystem = el('addSystem');
  const $removeSystem = el('removeSystem');
  const $addComponentToEntity = el('addComponentToEntity');
  const $removeEntityComponent = el('removeEntityComponent');
  const $turnOnButton = el('turnOnButton');
  const $turnOffButton = el('turnOffButton');
  const $toggleButton = el('toggleButton');

  /* Define ecs */
  const ecs = new ECS(new ShortUniqueId());

  /* Define entities */
  const entity1 = ecs.createEntity();
  const entity2 = ecs.createEntity();
  const entity3 = ecs.createEntity();

  /* Define components */
  const COMPONENT_MAP = {
    HaveDistance: { distance: 0, shouldMove: false },
    Vector2: { x: 0, y: 0 }
  };
  function generateComponents() {
    for (const [key, value] of Object.entries(COMPONENT_MAP)) {
      ecs.createComponent(key, value);
    }
  }
  generateComponents();

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
      ecs.addSystem(key, value);
    }
  }
  generateSystems();

  ecs.addComponentToEntity('HaveDistance', entity1, { shouldMove: true });
  ecs.addComponentToEntity('HaveDistance', entity2);
  ecs.addComponentToEntity('HaveDistance', entity3, { shouldMove: true });

  /* Attach event listeners */
  $addEntity.onclick = function () {
    ecs.createEntity();
    draw();
  };

  $removeEntity.onclick = function () {
    ecs.removeEntity($entitySelect.value);
    draw();
  };

  $addComponent.onclick = function () {
    if ($componentSelect.value === '*') {
      generateComponents();
      draw();
      return;
    }

    if (COMPONENT_MAP[$componentSelect.value]) {
      ecs.createComponent(
        $componentSelect.value,
        COMPONENT_MAP[$componentSelect.value]
      );
      draw();
    }
  };

  $removeComponent.onclick = function () {
    ecs.removeComponent($componentSelect.value);
    draw();
  };

  $addComponentToEntity.onclick = function () {
    let payload =
      $componentSelect.value === 'HaveDistance'
        ? { shouldMove: true }
        : undefined;

    ecs.addComponentToEntity(
      $componentSelect.value,
      $entitySelect.value,
      payload
    );
    draw();
  };

  $removeEntityComponent.onclick = function () {
    ecs.removeComponentFromEntity($componentSelect.value, $entitySelect.value);
    draw();
  };

  $addSystem.onclick = function () {
    if ($systemSelect.value === '*') {
      generateSystems();
      draw();
      return;
    }

    ecs.addSystem($systemSelect.value, function (entity) {
      if (!entity.distance && entity.distance !== null) return;

      if (entity.shouldMove) {
        if (entity.distance === null) entity.distance = 0;

        entity.distance++;
      }
    });
    $runButton.style.display = 'inline-block';
    draw();
  };

  $removeSystem.onclick = function () {
    ecs.removeSystem($systemSelect.value);
    draw();
  };

  $turnOnButton.onclick = function () {
    ecs.activate($systemSelect.value);
    draw();
  };
  $turnOffButton.onclick = function () {
    ecs.deactivate($systemSelect.value);
    draw();
  };
  $toggleButton.onclick = function () {
    ecs.toggle($systemSelect.value);
    draw();
  };
  $runButton.onclick = function () {
    console.log('running', ecs.systemMap)
    ecs.update();
    draw();
  };

  function generateAllOption() {
    const option = document.createElement('option');
    option.innerHTML = 'All';
    option.value = '*';
    return option;
  }

  function draw() {
    $monitor.innerHTML = JSON.stringify(ecs, '', 2);

    $entitySelect.innerHTML = '';
    $entitySelect.appendChild(generateAllOption());
    ecs.forEachEntity(function (entity) {
      const option = document.createElement('option');
      option.innerHTML = entity.id;
      $entitySelect.appendChild(option);
    });

    $componentSelect.innerHTML = '';
    $componentSelect.appendChild(generateAllOption());
    for (const key of Object.keys(COMPONENT_MAP)) {
      const option = document.createElement('option');
      option.innerHTML = key;
      $componentSelect.appendChild(option);
    }

    $systemSelect.innerHTML = '';
    $systemSelect.appendChild(generateAllOption());
    for (const key of Object.keys(SYSTEM_MAP)) {
      const option = document.createElement('option');
      option.innerHTML = key;
      $systemSelect.appendChild(option);
    }
  }

  draw();
});
