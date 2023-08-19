import Queue from "@farishan/queue/dist/bundle.min";

/**
 * A queue limited to a fixed number of items.
 *
 * @see https://xlinux.nist.gov/dads/HTML/boundedqueue.html
 * @param {number} limit
 * @returns {BoundedQueue}
 */
function BoundedQueue(limit = 3) {
    var queue = new Queue();
    let length = 0

    this.enqueue = function (item) {
        if (length === limit) {
            queue.dequeue()
        }
        queue.enqueue(item)
        length++
    };

    this.dequeue = function () {
        queue.dequeue();
        length--
    };

    this.toString = function () {
        return queue.toString()
    };

    return this;
}

export default BoundedQueue