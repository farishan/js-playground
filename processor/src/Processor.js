/* note: processor dont need a logger app */

'use strict';

function Processor(options = {}) {
    const self = this

    this.debug = options.debug || false
    this.processMap = new Map()

    this.register = function (key, func) {
        if (this.debug) console.info('registering process...', key, func)
        this.processMap.set(key, func)
        if (this.debug) console.info('process registered:', key)
    }

    this.process = function (key, input, callback) {
        if (!key) throw Error('Invalid process key.')
        if (!self.processMap.has(key)) throw Error('Unknown process.')


        if (this.debug) console.info('processing...', key)

        if (callback) {
            self.processMap.get(key)(input, callback)
        } else {
            self.processMap.get(key)(input)
        }

        if (this.debug) console.info('processed.', key)
    }

    /* Utils */
    this.setOption = function (key, value) {
        if (key === 'debug') {
            this.debug = value || false
        }
    }

    return this
}

export default Processor