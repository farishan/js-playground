(function () {
    'use strict';

    if(!window)throw Error("`window` is not defined. This module is for browser environment.");function WindowEventProxy(){const e={};return this.addEventListener=(n,o,t)=>{e[n]||(e[n]={}),e[n][o]=t,window.addEventListener(n,t);},this.removeEventListener=(n,o)=>{window.removeEventListener(n,e[n][o]),delete e[n][o];},this.debug=()=>{let n=document.getElementById("WindowEventProxy");n&&document.body.removeChild(n),n=document.createElement("div"),n.id="WindowEventProxy",n.style.border="1px solid",n.style.padding="1rem";const o=[];Object.keys(e).forEach((n=>{Object.keys(e[n]).forEach((e=>{o.push(n+"/"+e);}));})),n.innerHTML=`<pre><code>${JSON.stringify(o," ",2)}</code></pre>`,document.body.appendChild(n),console.log(this);},this}const windowEventProxy=new WindowEventProxy;

    /** Point -
     * Simple geometry point with x and y axis
     * @see https://en.wikipedia.org/wiki/Point_(geometry)
     * @returns Point instance
     */
    function Point(setting = {}) {
        this.x = setting.x || null;
        this.y = setting.y || null;

        return this
    }

    function CustomMouseEvent(setting = {}) {
        Point.call(this, { x: setting.x || null, y: setting.y || null });

        this.name = setting.name || 'undefined';

        return this
    }

    CustomMouseEvent.prototype = Object.assign({}, Point.prototype);
    CustomMouseEvent.prototype.contructor = CustomMouseEvent;

    function MouseDriver() {
        const namespace = 'MouseDriver';
        const self = this;

        const state = {
            is_mousedown: false,
            is_mouseup: false,
            is_mousemove: false
        };

        this.getState = () => state;

        this.on = function (eventKey, listenerKey, listener) {
            const mouseEvent = new CustomMouseEvent({ name: eventKey });

            windowEventProxy.addEventListener(eventKey, `${namespace}/${listenerKey}`, e => {
                if (eventKey === 'mouseup' && state[`is_mousedown`]) {
                    state[`is_mousedown`] = false;
                } else if (eventKey === 'mousedown' && state[`is_mouseup`]) {
                    state[`is_mouseup`] = false;
                } else {
                    state[`is_${eventKey}`] = true;
                }

                mouseEvent.x = e.clientX;
                mouseEvent.y = e.clientY;
                listener(mouseEvent);
            });

            return self
        };

        this.off = function (eventKey, listenerKey) {
            windowEventProxy.removeEventListener(eventKey, listenerKey);
            return self
        };

        this.debug = windowEventProxy.debug;

        return this
    }

    const mouseDriver = new MouseDriver();

    mouseDriver.on('mousedown', 'test1', payload => {
        console.log(payload, mouseDriver.getState());
        mouseDriver.debug();
    });
    mouseDriver.on('mouseup', 'test1', payload => {
        console.log(payload, mouseDriver.getState());
    });
    mouseDriver.on('mousemove', 'test1', payload => {
        console.log(payload, mouseDriver.getState());
    });
    // mouseDriver.run()

})();
