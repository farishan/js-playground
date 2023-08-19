'use strict';

import TerminalGUI from "./TerminalGUI";
import HistoryManager from "./HistoryManager";

function Terminal($root, options = {
    debug: false,
    historyLimit: 100
}) {
    /* Check runtime, should be browser */
    if (!document) {
        console.error("Cannot find HTML document.")
        return
    }

    /* Check terminal instance DOM container */
    this.$root = $root || document.body
    if (!this.$root || (this.$root && !this.$root.appendChild)) {
        console.error("Invalid root for Terminal.")
        return
    }

    this.debug = options.debug
    this.initialized = false

    this.lastInput = null
    this.currentInput = null

    this.onChange = null

    this.listenerMap = {
        /* key: callback */
    }

    //#region Modules
    const guiOptions = {
        debug: true,
        onSubmit: (...args) => this.handleInput(...args)
    }
    this.GUI_manager = new TerminalGUI(guiOptions)
    this.historyManager = new HistoryManager()
    //#endregion Modules
}

Terminal.prototype.addListener = function (key, callback) {
    if (!key || !callback) {
        console.error('Invalid props for Terminal.addListener')
        return
    }

    this.listenerMap[key] = callback
}

Terminal.prototype.emit = function (payload) {
    if (this.onChange !== null && typeof this.onChange === 'function') {
        this.onChange(payload)
    }

    const keys = Object.keys(this.listenerMap)
    if (keys.length > 0) {
        keys.forEach(key => {
            // Dispatch the event.
            this.listenerMap[key](payload);
        });
    }
}

/**
 * @deps Terminal.emit
*/
Terminal.prototype.handleInput = function (value, callback) {
    /* @TODO breakdown to a word processor module */
    if (this.lastInput !== this.currentInput) {
        this.lastInput = this.currentInput
    }

    if (this.currentInput !== value) this.currentInput = value

    this.historyManager.add(value)

    // @TODO enhance word processing
    const word1 = value.split(" ")[0];
    const word2 = value.split(" ")[1];
    const word3 = value.split(" ")[2];

    // Side-effects
    this.emit([word1, word2, word3])

    // Reset history pointer
    this.historyManager.resetPointer()

    callback()
}

// Method to execute after terminal rendered
Terminal.prototype.finalize = function () {
    this.GUI_manager.focusInput()
}

/**
 * @deps Terminal.handleInput
 * @deps Terminal.finalize
*/
Terminal.prototype.init = function () {
    const self = this

    this.GUI_manager.init(function (...args) {
        self.handleInput(...args)
    })

    /* Handle history */
    function handleHistory(e) {
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return

        if (e.key === 'ArrowUp') {
            self.historyManager.navigate('prev')
        } else if (e.key === 'ArrowDown') {
            self.historyManager.navigate('next')
        }

        /* @TODO preserve unsubmitted but already typed value */

        /* Set input value */
        self.GUI_manager.setInputValue(self.historyManager.getPointedValue())

        /* Move cursor to the end */
        self.GUI_manager.moveInputCursorToTheEnd()
    }

    this.GUI_manager.addInputListener('onkeydown', handleHistory)

    this.GUI_manager.finalize()

    // Assemblages & finalization
    this.$root.appendChild(this.GUI_manager.getRoot());
    this.finalize()

    this.initialized = true
}

export default Terminal