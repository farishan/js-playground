require(['ECS'], function (ECS) {
  const ecs = new ECS();
  ecs.createComponent('Position', { x: 0, y: 0 });

  const playerId = ecs.createEntity();
  ecs.addComponentToEntity('Position', playerId, { x: 1, y: 1 });
  // console.log(ecs.getEntity(playerId));

  setTimeout(() => {
    // ecs.removeComponentFromEntity('Position', playerId)
    // console.log(ecs.getEntity(playerId));
    ecs.update();
  }, 1000);

  ecs.addSystem('move', function (entity) {
    if (entity.x && entity.x !== null && entity.y && entity.y !== null) {
      entity.x++;
    }

    if (entity.x > 10) {
      ecs.removeComponentFromEntity('Position', playerId);
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') ecs.update();
  });

  const $properties = document.getElementById('properties');
  const functions = Object.keys(ECS.prototype);

  for (let index = 0; index < functions.length; index++) {
    const functionName = functions[index];

    $properties.innerHTML += `<li><code>${functionName}</code></li>`;
  }
});
