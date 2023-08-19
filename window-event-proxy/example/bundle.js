(function () {
    'use strict';

    if (!window) throw Error('`window` is not defined. This module is for browser environment.')

    function WindowEventProxy() {
        const namespace = 'WindowEventProxy';

        const eventListener = {};

        this.addEventListener = (eventKey, key, func) => {
            // set default value
            if (!eventListener[eventKey]) eventListener[eventKey] = {};

            // save listener
            eventListener[eventKey][key] = func;

            // add listener to real window
            window.addEventListener(eventKey, func);
        };

        this.removeEventListener = (eventKey, key) => {
            // remove listener from real window first
            window.removeEventListener(eventKey, eventListener[eventKey][key]);

            // remove listener
            delete eventListener[eventKey][key];
        };

        this.debug = () => {
            let debugWindow = document.getElementById(namespace);
            if (debugWindow) document.body.removeChild(debugWindow);

            debugWindow = document.createElement('div');
            debugWindow.id = namespace;
            debugWindow.style.border = '1px solid';
            debugWindow.style.padding = '1rem';

            const listeners = [];
            Object.keys(eventListener).forEach(eventKey => {
                Object.keys(eventListener[eventKey]).forEach(key => {
                    listeners.push(eventKey + '/' + key);
                });
            });

            debugWindow.innerHTML = `<pre><code>${JSON.stringify(listeners, ' ', 2)}</code></pre>`;
            document.body.appendChild(debugWindow);
            console.log(this);
        };

        return this
    }

    const windowEventProxy = new WindowEventProxy();

    console.log(windowEventProxy);
    windowEventProxy.addEventListener('mousemove', 'testId', () => {
        console.log('mousemoving...');
    });

    windowEventProxy.debug();

    setTimeout(() => {
        windowEventProxy.removeEventListener('mousemove', 'testId');
        console.log('mousemove event removed');
    }, 1000);

    // GUI for testing
    const addClickEventButton = document.createElement('button');
    addClickEventButton.innerHTML = 'Add click event';
    addClickEventButton.onclick = function() {
        windowEventProxy.addEventListener('click', Math.random().toString(), () => {console.log('clicked');});
        windowEventProxy.debug();
    };
    document.body.appendChild(addClickEventButton);

})();
//# sourceMappingURL=bundle.js.map
