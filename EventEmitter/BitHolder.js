function BitHolder(defaultValue = 0) {
    let value = defaultValue

    this.set = function(newValue) {
        value = newValue
    }

    this.get = function() {
        return value
    }

    return this
}