import { GRID_SIZE } from "./config"
import { initCanvas } from "./modules/canvas"
import { get } from "./modules/game-data"
import { listenInput } from "./modules/input"

main()

function main() {
  const { mapContext, entityContext } = initCanvas()

  if (mapContext === null) {
    console.debug('failed to get context')
    return
  }

  if (entityContext === null) {
    console.debug('failed to get entity context')
    return
  }

  renderMap(mapContext)
  renderEntities(entityContext)
  listenInput()
}

function renderMap(context: CanvasRenderingContext2D) {
  const pathmap = get('currentLevel').pathmap

  context.fillStyle = 'gray'

  for (let rowIndex = 0; rowIndex < pathmap.length; rowIndex++) {
    const columns = pathmap[rowIndex];
    for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
      const value = columns[columnIndex];

      if (value === 1) {
        context.fillRect(columnIndex * GRID_SIZE, rowIndex * GRID_SIZE, GRID_SIZE, GRID_SIZE)
      }
    }
  }

  context.fillStyle = 'black'
}

function renderEntities(context: CanvasRenderingContext2D) {
  let character;

  function render() {
    character = get('player').character
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)

    context.fillStyle = 'red'
    context.fillRect(character.x * GRID_SIZE + 5, character.y * GRID_SIZE + 5, GRID_SIZE - 10, GRID_SIZE - 10)
    context.fillStyle = 'black'

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}
