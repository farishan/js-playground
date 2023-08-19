define((function() {
    "use strict";
    function InputWithHistory(setting = {}) {
        const defaultSetting = {
            autofocus: true,
            historyLimit: 5,
            onsubmit: function(value) {
                console.log(value);
            }
        };
        const dom = document.createElement("input");
        dom.autofocus = setting.autofocus || defaultSetting.autofocus;
        const historyLimit = setting.historyLimit || defaultSetting.historyLimit;
        const history = [];
        let pointer = -1;
        const onsubmit = setting.onsubmit || defaultSetting.onsubmit;
        function selectContent() {
            window.requestAnimationFrame((function() {
                dom.select();
            }));
        }
        function handleUp() {
            if (pointer === -1) {
                pointer = history.length - 1;
            } else {
                if (pointer > 0) {
                    pointer--;
                }
            }
            dom.value = history[pointer];
            selectContent();
        }
        function handleDown() {
            if (pointer === -1) {
                pointer = history.length - 1;
            } else {
                if (pointer < history.length - 1) {
                    pointer++;
                    dom.value = history[pointer];
                    selectContent();
                } else {
                    pointer = -1;
                    dom.value = "";
                }
            }
        }
        dom.onkeydown = function(e) {
            if (e.key === "Enter") {
                history.push(this.value);
                if (history.length > historyLimit) {
                    history.shift();
                }
                if (onsubmit) onsubmit(this.value);
                this.value = "";
                pointer = -1;
            } else if (e.key === "ArrowUp") {
                handleUp();
            } else if (e.key === "ArrowDown") {
                handleDown();
            }
        };
        this.getDOM = function() {
            return dom;
        };
        return this;
    }
    return InputWithHistory;
}));
