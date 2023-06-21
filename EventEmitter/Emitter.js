function Emitter() {
    this.onEmit = function(data) {
        console.log('emitting: ',data)
    }
    this.emit = function (data) {
        this.onEmit(data)
    }
}
