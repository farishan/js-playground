'use strict';

/**
 * Creates a new Function Manager.
 * @class
 */
function FunctionManager() {
    /** @todo handle recursion/circular deps */

    this.functionMap = {}
    this.listenersByFunction = {}

    /**
     * Register a function to be called later
     * @name FunctionManager.register
     * @param {string} json.key unique key
     * @param {function} json.value "function to be executed later"/"main callee"
     */
    this.register = function (json) {
        // warn if the key already used
        if (this.functionMap[json.key]) {
            console.log('warning: ' + json.key + ' key has been used before.')
        }

        this.functionMap[json.key] = json.value
        console.log(`function with key: ${json.key} has been registered.`)
    }

    /**
     * Execute a registered function (main callee) and its listeners (side callees)
     * @name FunctionManager.execute
     * @param {string} json.key unique "registered function"/"main callee" key
     * @param {any} json.payload "function to be executed"/"registered function"/"main callee"'s arguments
     */
    this.execute = function (json) {
        const self = this

        if (!this.functionMap[json.key]) throw Error('unknown function.')

        // execute main callee
        this.functionMap[json.key](json.payload)

        // execute side callees
        if (this.listenersByFunction[json.key]) {
            const listenerKeys = Object.keys(this.listenersByFunction[json.key])
            listenerKeys.forEach(listenerKey => {
                self.listenersByFunction[json.key][listenerKey](json.payload)
            });
        }
    }

    /**
     * Listen to a registered function
     * @name FunctionManager.listen
     * @param {string} json.functionKey unique "registered function"/"main callee" key
     * @param {string} json.listenerKey unique "listener function"/"side callee" key
     * @param {function} json.callback callback
     */
    this.listen = function (json) {
        const { functionKey, listenerKey, callback } = json

        if (!this.functionMap[functionKey]) throw Error('unknown function.')

        // set default value
        if (!this.listenersByFunction[functionKey]) this.listenersByFunction[functionKey] = {}

        this.listenersByFunction[functionKey][listenerKey] = callback
    }
}

export default FunctionManager