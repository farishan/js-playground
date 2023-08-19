/**
     *
     * @param {*} options
     * @param {number} options.limit max data length
     */
function LimitedArray(options = {}) {
    const self = this

    this.limit = options.limit || 100
    this.data = []

    /* Methods */
    this.push = function (value) {
        if (self.data.length > self.limit - 1) {
            self.data.shift()
        }

        self.data.push(value)
    }
}

export default LimitedArray