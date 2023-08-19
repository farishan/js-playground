import Point from "./Point"

function CustomMouseEvent(setting = {}) {
    Point.call(this, { x: setting.x || null, y: setting.y || null })

    this.name = setting.name || 'undefined'

    return this
}

CustomMouseEvent.prototype = Object.assign({}, Point.prototype)
CustomMouseEvent.prototype.contructor = CustomMouseEvent

export default CustomMouseEvent