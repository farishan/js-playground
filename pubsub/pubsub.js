/* AMD Module for RequireJS */
define(function () {
    function PubSub() {
        const self = this
        let subscriberCount = 0

        this.eventMap = {}

        this.subscribe = function (key, callback) {
            const token = `${generateUID()}_${++subscriberCount}`

            if (!self.eventMap[key]) self.eventMap[key] = {}
            self.eventMap[key][token] = callback

            return token
        }

        this.publish = function (key, payload) {
            if (!self.eventMap[key]) {
                console.error('Unknown event:', key)
                return
            }

            const callbackKeys = Object.keys(self.eventMap[key])
            callbackKeys.forEach(callbackKey => {
                self.eventMap[key][callbackKey](payload)
            });
        }

        /* @TODO define unsubscribe method */

        /**
         * Built-in Module
         * @see https://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
         */
        function generateUID() {
            var a = (Math.random() * 46656) | 0;
            var b = (Math.random() * 46656) | 0;
            a = ("000" + a.toString(36)).slice(-3);
            b = ("000" + b.toString(36)).slice(-3);
            return a + b;
        }
    }

    return PubSub
})
