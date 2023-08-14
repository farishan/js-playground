function EventManager() {
    this.listenerMap = {};

    this.on = function (event, callback) {
        this.listenerMap[event] = callback;
    };

    this.off = function (event) {
        if (!this.listenerMap[event]) return

        delete this.listenerMap[event];
    };

    this.emit = function (event, payload) {
        if (!this.listenerMap[event]) {
            console.warn('unknown event: ' + event);
            return
        }
        this.listenerMap[event](payload);
    };

    return this
}

export { EventManager as default };
