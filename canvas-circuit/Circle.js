import { ctx } from "./ctx"
import { GRID_SIZE } from "./settings"

class Circle {
  constructor(colIndex, rowIndex, size, color) {
    this.colIndex = colIndex
    this.rowIndex = rowIndex
    this.size = size
    this.color = color
  }

  render() {
    ctx.beginPath()
    ctx.strokeStyle = this.color
    ctx.arc(
      this.colIndex * GRID_SIZE,
      this.rowIndex * GRID_SIZE,
      this.size,
      0,
      2 * Math.PI
    )
    ctx.stroke()
    ctx.strokeStyle = 'black'
  }
}

export { Circle }