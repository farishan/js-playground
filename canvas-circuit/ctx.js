import { BOARD_HEIGHT, BOARD_WIDTH } from "./settings"

const canvas = document.getElementById('canvas')
canvas.style.background = '#eee'
canvas.width = BOARD_WIDTH
canvas.height = BOARD_HEIGHT

const ctx = canvas.getContext('2d')

export { ctx, canvas }