/**
 * Queue data structure
 *
 * Operations:
 * - `Queue.enqueue`
 * - `Queue.dequeue`
 * - [helper] `Queue.toString`
 * @see https://en.wikipedia.org/wiki/Queue_(abstract_data_type)
 * @returns Queue
 */
function Queue() {
    "use strict";

    var items = [];

    /**
     * Add item to the queue's tail
     *
     * @kind method
     * @param {any} item The item to be added
     * @returns {Queue} The queue
     */
    this.enqueue = function (item) {
        items.push(item);
    };

    /**
     * Remove item from the queue's head
     *
     * @kind method
     * @returns {Queue} The queue
     */
    this.dequeue = function () {
        items.shift();
    };

    /**
     * Get stringified queue items
     *
     * @kind method
     * @returns {string} stringified items
     */
    this.toString = function () {
        return "dequeue < ".concat(items, " < enqueue");
    };

    return this;
}

export default Queue