require(['world'], function (World) {
  const canvasWidth = 400;
  const canvasHeight = 300;
  const maxRectSize = 50;
  const minRectSize = 20;

  const world = new World();

  /* Define entities */
  world.ecs.createEntity(3);

  /* Define components */
  const COMPONENT_MAP = {
    Rectangle: { width: 0, height: 0 },
    Vector2: { x: 0, y: 0 }
  };
  function generateComponents() {
    for (const [key, value] of Object.entries(COMPONENT_MAP)) {
      world.ecs.createComponent(key, value);
    }
  }
  generateComponents();

  world.ecs.forEachComponent(function (component) {
    world.ecs.forEachEntity(function (entity) {
      world.ecs.addComponentToEntity(component, entity.id);
    });
  });

  /* Define systems */
  const SYSTEM_MAP = {
    randomResize: function (entity) {
      if (entity.width === null) {
        entity.width = 1;
      }

      if (entity.height === null) {
        entity.height = 1;
      }

      if (!entity.width || !entity.height) return;

      entity.width =
        Math.floor(Math.random() * (maxRectSize - minRectSize)) + minRectSize;
      entity.height =
        Math.floor(Math.random() * (maxRectSize - minRectSize)) + minRectSize;
    },
    randomMove: function (entity) {
      if (entity.x === null) {
        entity.x = 1;
      }

      if (entity.y === null) {
        entity.y = 1;
      }

      if (!entity.x || !entity.y) return;

      entity.x = Math.floor(Math.random() * (canvasWidth - entity.width));
      entity.y = Math.floor(Math.random() * (canvasHeight - entity.height));
    }
  };
  function generateSystems() {
    for (const [key, value] of Object.entries(SYSTEM_MAP)) {
      world.ecs.addSystem(key, value);
      world.ecs.activate(key);
    }
  }
  generateSystems();

  const canvas = el('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.width = canvasWidth+'px';
  canvas.style.height = canvasHeight+'px';
  const context = canvas.getContext('2d');

  world.addListener(function () {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    world.ecs.forEachEntity(function (entity) {
      if (entity.x && entity.y && entity.width && entity.height) {
        /* !WARNING: attached to get-unique-color-id */
        console.log('drawing entity...', entity.id);
        context.fillStyle = entity.id.split('_')[0];
        context.fillRect(entity.x, entity.y, entity.width, entity.height);
      }
    });
  });

  world.ecs.update();
  world.draw();
});
