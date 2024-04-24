import { ctx } from "./ctx"
import { BOARD_HEIGHT, BOARD_WIDTH, COLUMN_COUNT, GRID_SIZE, ROW_COUNT } from "./settings"

function drawGrid() {
  for (let rowIndex = 0; rowIndex < ROW_COUNT; rowIndex++) {
    if (rowIndex === 0) continue

    ctx.beginPath()
    ctx.moveTo(0, rowIndex * GRID_SIZE)
    ctx.lineTo(BOARD_WIDTH, rowIndex * GRID_SIZE)
    ctx.stroke()

    for (let colIndex = 0; colIndex < COLUMN_COUNT; colIndex++) {
      if (colIndex === 0) continue
      ctx.beginPath()
      ctx.moveTo(colIndex * GRID_SIZE, 0)
      ctx.lineTo(colIndex * GRID_SIZE, BOARD_HEIGHT)
      ctx.stroke()
    }
  }
}

export { drawGrid }