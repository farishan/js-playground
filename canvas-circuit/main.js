import { Circle } from "./Circle"
import { canvas, ctx } from "./ctx"
import { drawGrid } from "./draw-grid"
import { BOARD_HEIGHT, BOARD_WIDTH, GRID_SIZE, NODE_HEIGHT, NODE_WIDTH, WIRE_SIZE } from "./settings"

let mouseX = -1
let mouseY = -1
let nodeDirection = 'e'
let nodeType = 'wire'
let nodes = []
let wires = []
let nearestCorner = 'ne'
let isN, isW, isS, isE;
let wireType = 0 // 0 = in, 1 = out
let lastWire = null

function getColIndex() {
  return Math.floor(mouseX / GRID_SIZE)
}

function getRowIndex() {
  return Math.floor(mouseY / GRID_SIZE)
}

canvas.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.offsetY

  isE = (mouseX / GRID_SIZE) - getColIndex() > 0.5
  isS = (mouseY / GRID_SIZE) - getRowIndex() > 0.5

  if (isS && isE) {
    nearestCorner = 'se'
  }
  else if (isS && !isE) {
    nearestCorner = 'sw'
  }
  else if (!isS && isE) {
    nearestCorner = 'ne'
  }
  else if (!isS && !isE) {
    nearestCorner = 'nw'
  }
})

canvas.addEventListener('mousedown', (e) => {
  if (nodeType === 'wire' || nodeType === 'source') {
    let col = getColIndex()
    let row = getRowIndex()

    switch (nearestCorner) {
      case 'ne':
        col++
        break;
      case 'sw':
        row++
        break;
      case 'se':
        col++
        row++
        break;
      default:
        break;
    }

    if (nodeType === 'wire') {
      console.log(wireType)
      nodes.push({
        type: nodeType,
        col,
        row,
        wireType
      })

      if(lastWire) {
        wires.push({
          from: [lastWire.x, lastWire.y],
          to: [col*GRID_SIZE, row*GRID_SIZE]
        })
        lastWire = null
      } else {
        lastWire = {x: col*GRID_SIZE, y: row*GRID_SIZE}
      }

      wireType = wireType === 0 ? 1 : 0
    } else {
      nodes.push({
        type: nodeType,
        col,
        row
      })
    }
  } else {
    console.log(getColIndex(), getRowIndex())
    let col = getColIndex()
    let row = getRowIndex()

    switch (nearestCorner) {
      case 'ne':
        col++
        break;
      case 'sw':
        row++
        break;
      case 'se':
        col++
        row++
        break;
      default:
        break;
    }

    const n = nodes.find(n => n.col === col && n.row === row)
    console.log(n)
    nodes = nodes.map(n => n.col === col && n.row === row /* && n.type === 'source' */ ? ({...n, isOn: n.isOn ? 0 : 1}) : n)
    wires = wires.map(w => w.from[0] === col*GRID_SIZE && w.from[1] === row*GRID_SIZE ? ({...w, isOn: w.isOn ? 0 : 1}) : w)
    console.log(wires)
  }
})

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'r':
      if (nodeDirection === 'e') nodeDirection = 's'
      else if (nodeDirection === 's') nodeDirection = 'w'
      else if (nodeDirection === 'w') nodeDirection = 'n'
      else nodeDirection = 'e'

      break;
    case 'w':
      nodeType = 'wire'
      break;
    case 's':
      nodeType = 'source'
      break;
    case '0':
      nodeType = null
    default:
      break;
  }
  console.log(e.key, nodeType)
})

const loop = () => {
  ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT)

  drawGrid()

  // draw nodes
  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    if (node.type === 'wire') {
      new Circle(node.col, node.row, NODE_WIDTH/4, node.isOn ? 'red' : node.wireType === 0 ? 'black' : 'blue').render()
    }
    else if (node.type === 'source') {
      new Circle(node.col, node.row, NODE_WIDTH/2, node.isOn ? 'red' : 'black').render()
    }
  }

  // draw wires
  for (let index = 0; index < wires.length; index++) {
    const wire = wires[index];
    ctx.beginPath()
    ctx.moveTo(wire.from[0], wire.from[1])
    ctx.lineTo(wire.to[0], wire.to[1])
    ctx.lineWidth = WIRE_SIZE
    if (wire.isOn) ctx.strokeStyle = 'red'
    ctx.stroke()
    ctx.lineWidth = 1
    if (wire.isOn) ctx.strokeStyle = 'black'
  }


  if (nodeType === 'wire') {
    ctx.beginPath()
    ctx.arc(
      mouseX,
      mouseY,
      (NODE_WIDTH) / 4,
      0,
      2 * Math.PI
    )
    ctx.stroke()

    // hint
    let preview;
    switch (nearestCorner) {
      case 'nw':
        preview = new Circle(getColIndex(), getRowIndex(), NODE_WIDTH/4)
        break;
      case 'ne':
        preview = new Circle(getColIndex()+1, getRowIndex(), NODE_WIDTH/4)
        break;
      case 'sw':
        preview = new Circle(getColIndex(), getRowIndex()+1, NODE_WIDTH/4)
        break;
      case 'se':
        preview = new Circle(getColIndex()+1, getRowIndex()+1, NODE_WIDTH/4)
        break;
      default:
        break;
    }
    preview.render()
  }
  else if(nodeType === 'source') {
    ctx.beginPath()
    ctx.arc(
      mouseX,
      mouseY,
      (NODE_WIDTH) / 2,
      0,
      2 * Math.PI
    )
    ctx.stroke()

    let preview;
    switch (nearestCorner) {
      case 'nw':
        preview = new Circle(getColIndex(), getRowIndex(), NODE_WIDTH/2)
        break;
      case 'ne':
        preview = new Circle(getColIndex()+1, getRowIndex(), NODE_WIDTH/2)
        break;
      case 'sw':
        preview = new Circle(getColIndex(), getRowIndex()+1, NODE_WIDTH/2)
        break;
      case 'se':
        preview = new Circle(getColIndex()+1, getRowIndex()+1, NODE_WIDTH/2)
        break;
      default:
        break;
    }
    preview.render()
  }
  // else {
  //   if (nodeDirection === 'e') {
  //     ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  //     ctx.fillRect(
  //       mouseX - (NODE_WIDTH) / 2,
  //       mouseY - (NODE_HEIGHT) / 2,
  //       (NODE_WIDTH),
  //       (NODE_HEIGHT)
  //     )
  //     ctx.beginPath()
  //     ctx.arc(
  //       mouseX + ((NODE_WIDTH) / 2),
  //       mouseY,
  //       (NODE_WIDTH) / 4,
  //       0,
  //       2 * Math.PI
  //     )
  //     ctx.fill()

  //     // hint
  //     ctx.fillStyle = "rgba(0, 0, 0, 1)";
  //     if (nearestCorner.includes('n')) {
  //       ctx.fillRect(
  //         Math.floor(mouseX / (GRID_SIZE)) * (NODE_WIDTH),
  //         (Math.floor(mouseY / (GRID_SIZE))-1) * (GRID_SIZE),
  //         (NODE_WIDTH),
  //         (NODE_HEIGHT)
  //       )
  //       ctx.beginPath()
  //       ctx.arc(
  //         (Math.floor(mouseX / (GRID_SIZE)) * GRID_SIZE) + GRID_SIZE,
  //         (Math.floor(mouseY / (GRID_SIZE))-1) * (GRID_SIZE) + (NODE_HEIGHT/2),
  //         (NODE_WIDTH) / 4,
  //         0,
  //         2 * Math.PI
  //       )
  //       ctx.fill()
  //     } else {
  //       ctx.fillRect(
  //         Math.floor(mouseX / (GRID_SIZE)) * (NODE_WIDTH),
  //         Math.floor(mouseY / (GRID_SIZE)) * (GRID_SIZE),
  //         (NODE_WIDTH),
  //         (NODE_HEIGHT)
  //       )
  //       ctx.beginPath()
  //       ctx.arc(
  //         (Math.floor(mouseX / (GRID_SIZE)) * GRID_SIZE) + GRID_SIZE,
  //         (Math.floor(mouseY / (GRID_SIZE))) * (GRID_SIZE) + (NODE_HEIGHT/2),
  //         (NODE_WIDTH) / 4,
  //         0,
  //         2 * Math.PI
  //       )
  //       ctx.fill()
  //     }
  //   }

  //   else if (nodeDirection === 's') {
  //     ctx.fillRect(mouseX - (NODE_HEIGHT) / 2, mouseY - (NODE_WIDTH) / 2, (NODE_HEIGHT), (NODE_WIDTH))
  //     ctx.beginPath()
  //     ctx.arc(
  //       mouseX,
  //       mouseY + ((NODE_WIDTH) / 2),
  //       (NODE_WIDTH) / 4,
  //       0,
  //       2 * Math.PI
  //     )
  //     ctx.fill()
  //   }

  //   else if (nodeDirection === 'w') {
  //     ctx.fillRect(mouseX - (NODE_WIDTH) / 2, mouseY - (NODE_HEIGHT) / 2, (NODE_WIDTH), (NODE_HEIGHT))
  //     ctx.beginPath()
  //     ctx.arc(
  //       mouseX - ((NODE_WIDTH) / 2),
  //       mouseY,
  //       (NODE_WIDTH) / 4,
  //       0,
  //       2 * Math.PI
  //     )
  //     ctx.fill()
  //   }

  //   else if (nodeDirection === 'n') {
  //     ctx.fillRect(mouseX - (NODE_HEIGHT) / 2, mouseY - (NODE_WIDTH) / 2, (NODE_HEIGHT), (NODE_WIDTH))
  //     ctx.beginPath()
  //     ctx.arc(
  //       mouseX,
  //       mouseY - ((NODE_WIDTH) / 2),
  //       (NODE_WIDTH) / 4,
  //       0,
  //       2 * Math.PI
  //     )
  //     ctx.fill()
  //   }
  // }

  requestAnimationFrame(loop)
};

loop();