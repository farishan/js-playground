require(['generate-all-option', 'world'], function (generateAllOption, World) {
  const world = new World();

  const $componentSelect = el('componentSelect');
  const $addComponent = el('addComponent');
  const $removeComponent = el('removeComponent');

  /* Define components */
  const COMPONENT_MAP = {
    HaveDistance: { distance: 0, shouldMove: false },
    Vector2: { x: 0, y: 0 }
  };
  function generateComponents() {
    for (const [key, value] of Object.entries(COMPONENT_MAP)) {
      world.ecs.createComponent(key, value);
    }
  }
  generateComponents();

  $addComponent.onclick = function () {
    if ($componentSelect.value === '*') {
      generateComponents();
      world.draw();
      return;
    }

    if (COMPONENT_MAP[$componentSelect.value]) {
      world.ecs.createComponent(
        $componentSelect.value,
        COMPONENT_MAP[$componentSelect.value]
      );
      world.draw();
    }
  };

  $removeComponent.onclick = function () {
    world.ecs.removeComponent($componentSelect.value);
    world.draw();
  };

  world.addListener(function () {
    $componentSelect.innerHTML = '';
    $componentSelect.appendChild(generateAllOption());
    for (const key of Object.keys(COMPONENT_MAP)) {
      const option = document.createElement('option');
      option.innerHTML = key;
      $componentSelect.appendChild(option);
    }
  });

  world.draw();
});
