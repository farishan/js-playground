(function () {
    'use strict';

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

    const eventManager = new EventManager();

    eventManager.on('test', function(payload) {
        console.log('testing...', payload);
    });

    eventManager.emit('test', 'hello world');

    eventManager.off('test');

    eventManager.emit('test', 'hello world');

    console.log(eventManager);

})();
//# sourceMappingURL=bundle.js.map
