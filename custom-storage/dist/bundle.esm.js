/**
 *
 * @param {*} options
 * @param {boolean} options.debug
 * @returns
 */
function CustomStorage(options = {}) {
    this.data = {};
    this.length = 0;
    this.debug = options.debug;

    return this
}

CustomStorage.prototype.clear = function () {
    this.data = {};
    this.length = 0;
};

CustomStorage.prototype.setItem = function (key, value) {
    if (!key || !value) throw Error('Invalid arguments.')

    this.data[key] = JSON.stringify(value);
    this.length++;

    return this.data
};

CustomStorage.prototype.getItem = function (key) {
    if (this.debug && !key) throw Error('Invalid arguments.')

    if (!this.data[key]) {
        if (this.debug) throw Error(`No data with key: ${key}`)
        return null
    }

    return JSON.parse(this.data[key])
};

CustomStorage.prototype.removeItem = function (key) {
    if (!key) throw Error('Invalid arguments.')
    if (!this.data[key]) throw Error(`No data with key: ${key}`)

    delete this.data[key];
    this.length--;

    return this.data
};

/* Aliases */
CustomStorage.prototype.read = CustomStorage.prototype.getItem;
CustomStorage.prototype.write = CustomStorage.prototype.setItem;
CustomStorage.prototype.delete = CustomStorage.prototype.removeItem;

export { CustomStorage as default };
