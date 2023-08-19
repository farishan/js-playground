define([ "@farishan/queue/dist/bundle.min" ], (function(Queue) {
    "use strict";
    function BoundedQueue(limit = 3) {
        var queue = new Queue;
        let length = 0;
        this.enqueue = function(item) {
            if (length === limit) {
                queue.dequeue();
            }
            queue.enqueue(item);
            length++;
        };
        this.dequeue = function() {
            queue.dequeue();
            length--;
        };
        this.toString = function() {
            return queue.toString();
        };
        return this;
    }
    return BoundedQueue;
}));
