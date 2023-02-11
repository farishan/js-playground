/* A bounded queue is a queue limited to a fixed number of items. */

function BoundedQueue(limit = 2, isStrict = true) {
    const items = []

    this.enqueue = function (item) {
        if (items.length === limit) {
            if (isStrict) return
            this.dequeue()
        }

        items.push(item)

        return this
    }

    this.dequeue = function () {
        items.shift()
        return this
    }

    this.toString = function () {
        return `dequeue < ${items} < enqueue`
    }

    return this
}
