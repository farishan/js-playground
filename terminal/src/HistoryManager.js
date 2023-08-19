'use strict';

import LimitedArray from "./LimitedArray";

/**
 *
 * @param {*} options
 * @param {number} options.limit max history items
 */
function HistoryManager(options = {}) {
    const self = this
    const DEFAULT_LIMIT = 100

    /* Pointer is used for selecting history item as 0/positive/negative index */
    this.pointer = 0
    this.limit = options.limit || DEFAULT_LIMIT
    this.items = new LimitedArray()

    this.add = this.items.push

    this.resetPointer = function () {
        self.pointer = 0
    }

    /**
     * Navigate through items
     * @param {string} direction 'prev' or 'next'
     */
    this.navigate = function (direction) {
        if (direction === 'prev') {
            if (self.pointer * -1 < self.items.data.length) self.pointer--
        } else if (direction === 'next') {
            if (self.pointer < 0) self.pointer++
        }
    }

    this.getPointedValue = function () {
        if (self.pointer === 0) return ''
        return self.items.data[self.items.data.length + self.pointer]
    }
}

export default HistoryManager