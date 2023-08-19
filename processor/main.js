/**
 * 1. register command to processor
 * 2. define input
 * 3. process input
 */

function ProcessorInput() {
    this.command = 'key',
        this.payload = {}
}

const processor = {
    commandMap: new Map(),
    registerCommand: function (command, process) {
        this.commandMap.set(command, process)
    },
    /**
     *
     * @param {ProcessorInput} input
     * @param {function} callback
     * @returns
     */
    process: function (input, callback) {
        if (!input) return
        if (!input.command) return

        if (!this.commandMap.has(input.command)) return

        if (callback) {
            this.commandMap.get(input.command)(input.payload, callback)
        } else {
            this.commandMap.get(input.command)(input.payload)
        }
    }
}

/* logger app example */
const namespace = `logger`
processor.registerCommand(
    `${namespace}_log`,
    (payload, callback) => {
        console.log(payload.message)
        callback('log output')
    }
)

/* logger app example usage */
let input = {
    command: `${namespace}_log`,
    payload: {
        message: 'hello'
    }
}

processor.process(input, (output) => {
    console.log(output)
    document.write(output)
})
