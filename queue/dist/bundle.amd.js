define((function() {
    "use strict";
    function Queue() {
        const items = [];
        this.enqueue = function(item) {
            items.push(item);
        };
        this.dequeue = function() {
            items.shift();
        };
        this.toString = function() {
            return `dequeue < ${items} < enqueue`;
        };
        return this;
    }
    return Queue;
}));
