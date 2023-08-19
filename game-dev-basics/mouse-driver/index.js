import windowEventProxy from "window-event-proxy/dist/bundle";
import CustomMouseEvent from "./modules/CustomMouseEvent";

function MouseDriver() {
    const namespace = 'MouseDriver'
    const self = this

    const state = {
        is_mousedown: false,
        is_mouseup: false,
        is_mousemove: false
    }

    this.getState = () => state

    this.on = function (eventKey, listenerKey, listener) {
        const mouseEvent = new CustomMouseEvent({ name: eventKey })

        windowEventProxy.addEventListener(eventKey, `${namespace}/${listenerKey}`, e => {
            if (eventKey === 'mouseup' && state[`is_mousedown`]) {
                state[`is_mousedown`] = false
            } else if (eventKey === 'mousedown' && state[`is_mouseup`]) {
                state[`is_mouseup`] = false
            } else {
                state[`is_${eventKey}`] = true
            }

            mouseEvent.x = e.clientX
            mouseEvent.y = e.clientY
            listener(mouseEvent)
        })

        return self
    }

    this.off = function (eventKey, listenerKey) {
        windowEventProxy.removeEventListener(eventKey, listenerKey)
        return self
    }

    this.debug = windowEventProxy.debug

    return this
}

const mouseDriver = new MouseDriver()

export default mouseDriver