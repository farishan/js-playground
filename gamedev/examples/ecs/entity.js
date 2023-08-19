require(['generate-all-option', 'world'], function (generateAllOption, World) {
  const world = new World();

  const $addEntity = el('addEntity');
  const $removeEntity = el('removeEntity');
  const $entitySelect = el('entitySelect');

  /* Define entities */
  world.ecs.createEntity(3);

  /* Attach event listeners */
  $addEntity.onclick = function () {
    world.ecs.createEntity();
    world.draw();
  };

  $removeEntity.onclick = function () {
    world.ecs.removeEntity($entitySelect.value);
    world.draw();
  };

  world.addListener(function () {
    $entitySelect.innerHTML = '';
    $entitySelect.appendChild(generateAllOption());
    world.ecs.forEachEntity(function (entity) {
      const option = document.createElement('option');
      option.innerHTML = entity.id;
      $entitySelect.appendChild(option);
    });
  });

  world.draw();
});
