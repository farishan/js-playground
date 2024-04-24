import { GRID_SIZE } from "../config"
import { get } from "./game-data"

function initCanvas() {
  const pathmap = get('currentLevel').pathmap

  const root = document.createElement('div')
  root.style.position = 'relative'

  const mapCanvas = document.createElement('canvas')
  const mapContext = mapCanvas.getContext('2d')
  mapCanvas.width = pathmap[0].length * GRID_SIZE
  mapCanvas.height = pathmap.length * GRID_SIZE
  mapCanvas.style.background = 'black'
  root.append(mapCanvas)

  const entityCanvas = document.createElement('canvas')
  const entityContext = entityCanvas.getContext('2d')
  entityCanvas.width = pathmap[0].length * GRID_SIZE
  entityCanvas.height = pathmap.length * GRID_SIZE
  entityCanvas.style.position = 'absolute'
  entityCanvas.style.left = '0'
  entityCanvas.style.top = '0'
  root.append(entityCanvas)

  document.body.append(root)

  return { mapContext, entityContext }
}

export { initCanvas }