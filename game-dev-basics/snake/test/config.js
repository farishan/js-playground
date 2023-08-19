const CANVAS_WIDTH = 640
const CANVAS_HEIGHT = 360

const TILE_WIDTH = 640 / 16
const TILE_HEIGHT = 360 / 9

const SNAKE_PART_WIDTH = TILE_WIDTH
const SNAKE_PART_HEIGHT = TILE_HEIGHT

const canvas = document.createElement('canvas')
canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT
canvas.style.border = '1px solid'
const canvasContext = canvas.getContext('2d')
document.body.appendChild(canvas)

/* up | down | left | right */
let direction = 'right'
let nextDirection = 'right'
let x = 0
let y = 0

let appleX = 0
let appleY = 0
