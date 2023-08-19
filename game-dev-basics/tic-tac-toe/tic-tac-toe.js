/*

    Step 1. Display 3x3 grid

*/

class CellView {
    constructor(cell, onCellClick) {
        this.dom = document.createElement('div')
        this.dom.id = cell.id
        this.dom.style.outline = '4px solid'
        this.dom.style.width = `${cell.size}px`
        this.dom.style.height = `${cell.size}px`
        this.dom.style.display = 'flex'
        this.dom.style.justifyContent = 'center'
        this.dom.style.alignItems = 'center'
        this.dom.style.fontSize = cell.size / 2 + 'px'
        this.dom.style.userSelect = 'none'

        this.dom.addEventListener('mouseenter', function () {
            this.style.outlineColor = 'gray'
        })
        this.dom.addEventListener('mouseleave', function () {
            this.style.outlineColor = 'initial'
        })
        this.dom.addEventListener('mousedown', function () {
            this.style.outlineColor = 'white'
        })
        this.dom.addEventListener('mouseup', function () {
            this.style.outlineColor = 'initial'
        })
        this.dom.addEventListener('click', function () {
            onCellClick(cell)
        })
    }

    setContent(value) {
        this.dom.innerHTML = value
    }

    getDOM() {
        return this.dom
    }
}

class Cell {
    constructor(rowIndex, columnIndex, size, onCellClick) {
        this.id = `r${rowIndex}_c${columnIndex}`
        this.rowIndex = rowIndex
        this.columnIndex = columnIndex
        this.size = size
        this.value = null
        this.view = new CellView(this, function (cell) {
            onCellClick(cell)
        })
    }

    setValue(value) {
        this.value = value
        this.view.setContent(value)
    }
}

class GridView {
    constructor(grid) {
        this.dom = document.createElement('div')
        this.dom.style.outline = '8px solid'
        this.dom.style.display = 'flex'
        this.dom.style.flexWrap = 'wrap'
        this.dom.style.width = `${grid.width * grid.cellSizeInPx}px`
        this.dom.style.height = `${grid.height * grid.cellSizeInPx}px`
    }

    append(...args) {
        this.dom.append(...args)
    }

    clear() {
        this.dom.innerHTML = ''
    }

    getDOM() {
        return this.dom
    }
}

class Grid {
    constructor(width, height, cellSizeInPx, onCellClick) {
        this.cells = []
        this.width = width
        this.height = height
        this.cellSizeInPx = cellSizeInPx
        this.view = new GridView(this)

        this.generateCells(function (cell) {
            onCellClick(cell)
        })
        this.renderCells()
    }

    generateCells(onCellClick) {
        for (let rowIndex = 0; rowIndex < this.width; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.height; columnIndex++) {
                if (!this.cells[rowIndex]) this.cells[rowIndex] = []
                this.cells[rowIndex][columnIndex] = new Cell(rowIndex, columnIndex, this.cellSizeInPx, function (cell) {
                    onCellClick(cell)
                })
            }
        }
    }

    renderCells() {
        this.view.clear()

        this.forEachCell((cell) => {
            this.view.append(this.cells[cell.rowIndex][cell.columnIndex].view.getDOM())
        })
    }

    forEachCell(callback) {
        let index = -1;
        for (let rowIndex = 0; rowIndex < this.cells.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.cells[rowIndex].length; columnIndex++) {
                index++
                callback(this.cells[rowIndex][columnIndex], index)
            }
        }
    }

    getEmptyCell() {
        let result = null
        let attempt = 0
        const MAX_ATTEMPT = 1000

        while (result === null && attempt < MAX_ATTEMPT) {
            const randomRow = Math.floor(Math.random() * this.width)
            const randomColumn = Math.floor(Math.random() * this.height)
            if (this.cells[randomRow][randomColumn].value === null) {
                result = { rowIndex: randomRow, columnIndex: randomColumn }
            }
            attempt++
        }

        return result
    }

    setCell(rowIndex, columnIndex, value) {
        this.cells[rowIndex][columnIndex].setValue(value)
    }

    toString() {
        let string = ``

        this.forEachCell((cell, index) => {
            console.log(index)
            string += `[${cell.value === '&#x2715' ? 'x' : cell.value === '&xcirc;' ? 'o' : ' '}]${index % 3 === 2 ? '\n' : ''}`
        })

        return string
    }
}

const ticTacToe = {
    config: {
        cellSize: 48 * 2, //px
        playerMark: '&#x2715',
        computerMark: '&xcirc;'
    },
    state: {
        isOver: false,
        fillCount: 0,
        isPlayerTurn: true,
    },
    view: document.getElementById('display'),
    grid: null,
    start: function () {
        const self = this
        this.grid = new Grid(3, 3, this.config.cellSize, function (cell) {
            self.onCellClick(cell)
        })
        this.view.style.padding = `${this.config.cellSize}px`
        this.view.append(this.grid.view.getDOM())
    },
    update: function () {
        if (this.state.isOver) return

        /* @TODO check for winner */
        const combinations = [
            /* horizontal */
            ['r0_c0','r0_c1','r0_c2'],
            ['r1_c0','r1_c1','r1_c2'],
            ['r2_c0','r2_c1','r2_c2'],

            /* vertical */
            ['r0_c0','r1_c0','r2_c0'],
            ['r0_c1','r1_c1','r2_c1'],
            ['r0_c2','r1_c2','r2_c2'],

            /* diagonal */
            ['r0_c0','r1_c1','r2_c2'],
            ['r0_c2','r1_c1','r2_c0'],
        ]

        if(this.state.fillCount >= 5){
            // console.log(this.state.fillCount, this.grid)

            console.log(this.grid.toString())

            /* check rows */
            // for (let index = 0; index < this.grid.cells.length; index++) {
            //     let isMatched = false

            //     const rowCells = this.grid.cells[index];
            //     for (let cellIndex = 0; cellIndex < rowCells.length; cellIndex++) {
            //         const cell = rowCells[cellIndex];
            //         console.log('row '+index, cell.value)
            //     }
            //     console.log(rowCells)
            // }

            /* for each row, for each column, for each diagonal */
            for (let index = 0; index < combinations.length; index++) {
                // console.log(combinations[index])
                // let isValid = false
                // let storage = []

                // for (let index1 = 0; index1 < combinations[index].length; index1++) {
                //     const cellId = combinations[index][index1];
                //     const rowIndex = cellId.split('_')[0][1]
                //     const columnIndex = cellId.split('_')[1][1]
                //     const cellValue = this.grid.cells[rowIndex][columnIndex].value

                // }
            }
        }

        if (!this.state.isPlayerTurn) {
            const computerSelectedCell = this.grid.getEmptyCell()
            if (!computerSelectedCell) return
            this.grid.setCell(computerSelectedCell.rowIndex, computerSelectedCell.columnIndex, this.config.computerMark)
            this.state.isPlayerTurn = true
            this.state.fillCount++
            this.update()
        }

        if (this.fillCount >= this.grid.width * this.grid.height) {
            this.state.isOver = true
        }
    },
    onCellClick: function (cell) {
        if (!this.state.isPlayerTurn) return
        if (cell.value !== null) return

        this.grid.setCell(cell.rowIndex, cell.columnIndex, this.config.playerMark)
        this.state.isPlayerTurn = false
        this.state.fillCount++

        if (this.fillCount >= this.grid.width * this.grid.height) {
            this.state.isOver = true
        }

        this.update()
    }
}

ticTacToe.start()