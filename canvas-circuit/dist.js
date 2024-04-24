// settings.js
var SCALE = 10;
var WIRE_SIZE = 3;
var GRID_SIZE = 3 * SCALE;
var NODE_WIDTH = GRID_SIZE;
var NODE_HEIGHT = GRID_SIZE * 2;
var COLUMN_COUNT = 16;
var ROW_COUNT = 9;
var BOARD_WIDTH = COLUMN_COUNT * GRID_SIZE;
var BOARD_HEIGHT = ROW_COUNT * GRID_SIZE;

// ctx.js
var canvas = document.getElementById("canvas");
canvas.style.background = "#eee";
canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;
var ctx = canvas.getContext("2d");

// Circle.js
class Circle {
  constructor(colIndex, rowIndex, size, color) {
    this.colIndex = colIndex;
    this.rowIndex = rowIndex;
    this.size = size;
    this.color = color;
  }
  render() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.arc(this.colIndex * GRID_SIZE, this.rowIndex * GRID_SIZE, this.size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.strokeStyle = "black";
  }
}

// draw-grid.js
var drawGrid = function() {
  for (let rowIndex = 0;rowIndex < ROW_COUNT; rowIndex++) {
    if (rowIndex === 0)
      continue;
    ctx.beginPath();
    ctx.moveTo(0, rowIndex * GRID_SIZE);
    ctx.lineTo(BOARD_WIDTH, rowIndex * GRID_SIZE);
    ctx.stroke();
    for (let colIndex = 0;colIndex < COLUMN_COUNT; colIndex++) {
      if (colIndex === 0)
        continue;
      ctx.beginPath();
      ctx.moveTo(colIndex * GRID_SIZE, 0);
      ctx.lineTo(colIndex * GRID_SIZE, BOARD_HEIGHT);
      ctx.stroke();
    }
  }
};

// main.js
var getColIndex = function() {
  return Math.floor(mouseX / GRID_SIZE);
};
var getRowIndex = function() {
  return Math.floor(mouseY / GRID_SIZE);
};
var mouseX = -1;
var mouseY = -1;
var nodeDirection = "e";
var nodeType = "wire";
var nodes = [];
var wires = [];
var nearestCorner = "ne";
var isS;
var isE;
var wireType = 0;
var lastWire = null;
canvas.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.offsetY;
  isE = mouseX / GRID_SIZE - getColIndex() > 0.5;
  isS = mouseY / GRID_SIZE - getRowIndex() > 0.5;
  if (isS && isE) {
    nearestCorner = "se";
  } else if (isS && !isE) {
    nearestCorner = "sw";
  } else if (!isS && isE) {
    nearestCorner = "ne";
  } else if (!isS && !isE) {
    nearestCorner = "nw";
  }
});
canvas.addEventListener("mousedown", (e) => {
  if (nodeType === "wire" || nodeType === "source") {
    let col = getColIndex();
    let row = getRowIndex();
    switch (nearestCorner) {
      case "ne":
        col++;
        break;
      case "sw":
        row++;
        break;
      case "se":
        col++;
        row++;
        break;
      default:
        break;
    }
    if (nodeType === "wire") {
      console.log(wireType);
      nodes.push({
        type: nodeType,
        col,
        row,
        wireType
      });
      if (lastWire) {
        wires.push({
          from: [lastWire.x, lastWire.y],
          to: [col * GRID_SIZE, row * GRID_SIZE]
        });
        lastWire = null;
      } else {
        lastWire = { x: col * GRID_SIZE, y: row * GRID_SIZE };
      }
      wireType = wireType === 0 ? 1 : 0;
    } else {
      nodes.push({
        type: nodeType,
        col,
        row
      });
    }
  } else {
    console.log(getColIndex(), getRowIndex());
    let col = getColIndex();
    let row = getRowIndex();
    switch (nearestCorner) {
      case "ne":
        col++;
        break;
      case "sw":
        row++;
        break;
      case "se":
        col++;
        row++;
        break;
      default:
        break;
    }
    const n = nodes.find((n2) => n2.col === col && n2.row === row);
    console.log(n);
    nodes = nodes.map((n2) => n2.col === col && n2.row === row ? { ...n2, isOn: n2.isOn ? 0 : 1 } : n2);
    wires = wires.map((w) => w.from[0] === col * GRID_SIZE && w.from[1] === row * GRID_SIZE ? { ...w, isOn: w.isOn ? 0 : 1 } : w);
    console.log(wires);
  }
});
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "r":
      if (nodeDirection === "e")
        nodeDirection = "s";
      else if (nodeDirection === "s")
        nodeDirection = "w";
      else if (nodeDirection === "w")
        nodeDirection = "n";
      else
        nodeDirection = "e";
      break;
    case "w":
      nodeType = "wire";
      break;
    case "s":
      nodeType = "source";
      break;
    case "0":
      nodeType = null;
    default:
      break;
  }
  console.log(e.key, nodeType);
});
var loop = () => {
  ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
  drawGrid();
  for (let index = 0;index < nodes.length; index++) {
    const node = nodes[index];
    if (node.type === "wire") {
      new Circle(node.col, node.row, NODE_WIDTH / 4, node.isOn ? "red" : node.wireType === 0 ? "black" : "blue").render();
    } else if (node.type === "source") {
      new Circle(node.col, node.row, NODE_WIDTH / 2, node.isOn ? "red" : "black").render();
    }
  }
  for (let index = 0;index < wires.length; index++) {
    const wire = wires[index];
    ctx.beginPath();
    ctx.moveTo(wire.from[0], wire.from[1]);
    ctx.lineTo(wire.to[0], wire.to[1]);
    ctx.lineWidth = WIRE_SIZE;
    if (wire.isOn)
      ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.lineWidth = 1;
    if (wire.isOn)
      ctx.strokeStyle = "black";
  }
  if (nodeType === "wire") {
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, NODE_WIDTH / 4, 0, 2 * Math.PI);
    ctx.stroke();
    let preview;
    switch (nearestCorner) {
      case "nw":
        preview = new Circle(getColIndex(), getRowIndex(), NODE_WIDTH / 4);
        break;
      case "ne":
        preview = new Circle(getColIndex() + 1, getRowIndex(), NODE_WIDTH / 4);
        break;
      case "sw":
        preview = new Circle(getColIndex(), getRowIndex() + 1, NODE_WIDTH / 4);
        break;
      case "se":
        preview = new Circle(getColIndex() + 1, getRowIndex() + 1, NODE_WIDTH / 4);
        break;
      default:
        break;
    }
    preview.render();
  } else if (nodeType === "source") {
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, NODE_WIDTH / 2, 0, 2 * Math.PI);
    ctx.stroke();
    let preview;
    switch (nearestCorner) {
      case "nw":
        preview = new Circle(getColIndex(), getRowIndex(), NODE_WIDTH / 2);
        break;
      case "ne":
        preview = new Circle(getColIndex() + 1, getRowIndex(), NODE_WIDTH / 2);
        break;
      case "sw":
        preview = new Circle(getColIndex(), getRowIndex() + 1, NODE_WIDTH / 2);
        break;
      case "se":
        preview = new Circle(getColIndex() + 1, getRowIndex() + 1, NODE_WIDTH / 2);
        break;
      default:
        break;
    }
    preview.render();
  }
  requestAnimationFrame(loop);
};
loop();
