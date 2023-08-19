'use strict';

function TerminalGUI(options = {
    debug: false,
    onSubmit: () => { }
}) {
    /* Check runtime, should be browser */
    if (!document) {
        console.error("Cannot find HTML document.")
        return
    }

    const self = this

    this.DOM_map = {
        root: document.createElement('form'),
        input: document.createElement('input')
    }

    this.init = function () {
        /* Destructuring for easy access */
        const { root, input } = self.DOM_map

        /* DOM settings */
        input.name = 'input'
        input.placeholder = 'type something...'
        root.autocomplete = 'off'

        /* Submit handler */
        root.onsubmit = (e) => {
            e.preventDefault()

            const { value } = input

            if (options.debug) {
                const log = document.createElement('p')
                log.innerHTML = value
                root.appendChild(log)
            }

            options.onSubmit(
                value.toLowerCase(),
                self.resetInput
            );
        }
    }

    this.focusInput = function () {
        if (!self.DOM_map.input.isConnected) return
        self.DOM_map.input.focus();
    }

    this.addInputListener = function (event, callback) {
        self.DOM_map.input[event] = callback
    }

    this.resetInput = function () {
        self.DOM_map.input.value = ''
    }

    this.setInputValue = function (value) {
        self.DOM_map.input.value = value
    }

    this.finalize = function () {
        self.DOM_map.root.appendChild(self.DOM_map.input);
    }

    this.getRoot = function () {
        return self.DOM_map.root
    }

    this.moveInputCursorToTheEnd = function () {
        const { input } = self.DOM_map
        setTimeout(() => input.selectionStart = input.selectionEnd = 10000, 0);
    }
}

export default TerminalGUI