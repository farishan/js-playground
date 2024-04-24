// config.ts
var GRID_SIZE = 50;

// modules/game-data.ts
var get = function(key) {
  return { ...gameData[key] };
};
var set = function(key, value) {
  gameData[key] = value;
  return gameData;
};
var gameData = {
  currentLevel: {
    pathmap: [
      [0, 0, 1, 1, 1],
      [0, 0, 1, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0]
    ]
  },
  player: {
    character: {
      x: 2,
      y: 2
    }
  }
};

// modules/canvas.ts
var initCanvas = function() {
  const pathmap = get("currentLevel").pathmap;
  const root = document.createElement("div");
  root.style.position = "relative";
  const mapCanvas = document.createElement("canvas");
  const mapContext = mapCanvas.getContext("2d");
  mapCanvas.width = pathmap[0].length * GRID_SIZE;
  mapCanvas.height = pathmap.length * GRID_SIZE;
  mapCanvas.style.background = "black";
  root.append(mapCanvas);
  const entityCanvas = document.createElement("canvas");
  const entityContext = entityCanvas.getContext("2d");
  entityCanvas.width = pathmap[0].length * GRID_SIZE;
  entityCanvas.height = pathmap.length * GRID_SIZE;
  entityCanvas.style.position = "absolute";
  entityCanvas.style.left = "0";
  entityCanvas.style.top = "0";
  root.append(entityCanvas);
  document.body.append(root);
  return { mapContext, entityContext };
};

// modules/input.ts
var listenInput = function() {
  let map;
  let player;
  window.addEventListener("keyup", function(e) {
    map = get("currentLevel").pathmap;
    player = get("player");
    if (e.key === "w") {
      if (map[player.character.y - 1]?.[player.character.x] === 1)
        player.character.y--;
    } else if (e.key === "s") {
      if (map[player.character.y + 1]?.[player.character.x] === 1)
        player.character.y++;
    } else if (e.key === "a") {
      if (map[player.character.y]?.[player.character.x - 1] === 1)
        player.character.x--;
    } else if (e.key === "d") {
      if (map[player.character.y]?.[player.character.x + 1] === 1)
        player.character.x++;
    }
    set("player", player);
  });
};

// index.ts
var main = function() {
  const { mapContext, entityContext } = initCanvas();
  if (mapContext === null) {
    console.debug("failed to get context");
    return;
  }
  if (entityContext === null) {
    console.debug("failed to get entity context");
    return;
  }
  renderMap(mapContext);
  renderEntities(entityContext);
  listenInput();
};
var renderMap = function(context) {
  const pathmap = get("currentLevel").pathmap;
  context.fillStyle = "gray";
  for (let rowIndex = 0;rowIndex < pathmap.length; rowIndex++) {
    const columns = pathmap[rowIndex];
    for (let columnIndex = 0;columnIndex < columns.length; columnIndex++) {
      const value = columns[columnIndex];
      if (value === 1) {
        context.fillRect(columnIndex * GRID_SIZE, rowIndex * GRID_SIZE, GRID_SIZE, GRID_SIZE);
      }
    }
  }
  context.fillStyle = "black";
};
var renderEntities = function(context) {
  let character;
  function render() {
    character = get("player").character;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "red";
    context.fillRect(character.x * GRID_SIZE + 5, character.y * GRID_SIZE + 5, GRID_SIZE - 10, GRID_SIZE - 10);
    context.fillStyle = "black";
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
};
main();
