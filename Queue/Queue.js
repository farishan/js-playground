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
    const items = []

    /**
     * Add item to the queue's tail
     *
     * @method
     * @param {any} item The item to be added
     * @returns {Queue} The queue
     */
    this.enqueue = function (item) {
        items.push(item)
        return this
    }

    /**
     * Remove item from the queue's head
     *
     * @method
     * @returns {Queue} The queue
     */
    this.dequeue = function () {
        items.shift()
        return this
    }

    /**
     * Get stringified queue items
     *
     * @method
     * @returns {string} stringified items
     */
    this.toString = function () {
        return `dequeue < ${items} < enqueue`
    }

    return this
}
