(() => {
  // src/TerminalGUI.js
  function TerminalGUI(options = {
    debug: false,
    onSubmit: () => {
    }
  }) {
    if (!document) {
      console.error("Cannot find HTML document.");
      return;
    }
    const self = this;
    this.DOM_map = {
      root: document.createElement("form"),
      input: document.createElement("input")
    };
    this.init = function() {
      const { root, input } = self.DOM_map;
      input.name = "input";
      input.placeholder = "type something...";
      root.autocomplete = "off";
      root.onsubmit = (e) => {
        e.preventDefault();
        const { value } = input;
        if (options.debug) {
          const log = document.createElement("p");
          log.innerHTML = value;
          root.appendChild(log);
        }
        options.onSubmit(
          value.toLowerCase(),
          self.resetInput
        );
      };
    };
    this.focusInput = function() {
      if (!self.DOM_map.input.isConnected)
        return;
      self.DOM_map.input.focus();
    };
    this.addInputListener = function(event, callback) {
      self.DOM_map.input[event] = callback;
    };
    this.resetInput = function() {
      self.DOM_map.input.value = "";
    };
    this.setInputValue = function(value) {
      self.DOM_map.input.value = value;
    };
    this.finalize = function() {
      self.DOM_map.root.appendChild(self.DOM_map.input);
    };
    this.getRoot = function() {
      return self.DOM_map.root;
    };
    this.moveInputCursorToTheEnd = function() {
      const { input } = self.DOM_map;
      setTimeout(() => input.selectionStart = input.selectionEnd = 1e4, 0);
    };
  }
  var TerminalGUI_default = TerminalGUI;

  // src/LimitedArray.js
  function LimitedArray(options = {}) {
    const self = this;
    this.limit = options.limit || 100;
    this.data = [];
    this.push = function(value) {
      if (self.data.length > self.limit - 1) {
        self.data.shift();
      }
      self.data.push(value);
    };
  }
  var LimitedArray_default = LimitedArray;

  // src/HistoryManager.js
  function HistoryManager(options = {}) {
    const self = this;
    const DEFAULT_LIMIT = 100;
    this.pointer = 0;
    this.limit = options.limit || DEFAULT_LIMIT;
    this.items = new LimitedArray_default();
    this.add = this.items.push;
    this.resetPointer = function() {
      self.pointer = 0;
    };
    this.navigate = function(direction) {
      if (direction === "prev") {
        if (self.pointer * -1 < self.items.data.length)
          self.pointer--;
      } else if (direction === "next") {
        if (self.pointer < 0)
          self.pointer++;
      }
    };
    this.getPointedValue = function() {
      if (self.pointer === 0)
        return "";
      return self.items.data[self.items.data.length + self.pointer];
    };
  }
  var HistoryManager_default = HistoryManager;

  // src/Terminal.js
  function Terminal($root, options = {
    debug: false,
    historyLimit: 100
  }) {
    if (!document) {
      console.error("Cannot find HTML document.");
      return;
    }
    this.$root = $root || document.body;
    if (!this.$root || this.$root && !this.$root.appendChild) {
      console.error("Invalid root for Terminal.");
      return;
    }
    this.debug = options.debug;
    this.initialized = false;
    this.lastInput = null;
    this.currentInput = null;
    this.onChange = null;
    this.listenerMap = {};
    const guiOptions = {
      debug: true,
      onSubmit: (...args) => this.handleInput(...args)
    };
    this.GUI_manager = new TerminalGUI_default(guiOptions);
    this.historyManager = new HistoryManager_default();
  }
  Terminal.prototype.addListener = function(key, callback) {
    if (!key || !callback) {
      console.error("Invalid props for Terminal.addListener");
      return;
    }
    this.listenerMap[key] = callback;
  };
  Terminal.prototype.emit = function(payload) {
    if (this.onChange !== null && typeof this.onChange === "function") {
      this.onChange(payload);
    }
    const keys = Object.keys(this.listenerMap);
    if (keys.length > 0) {
      keys.forEach((key) => {
        this.listenerMap[key](payload);
      });
    }
  };
  Terminal.prototype.handleInput = function(value, callback) {
    if (this.lastInput !== this.currentInput) {
      this.lastInput = this.currentInput;
    }
    if (this.currentInput !== value)
      this.currentInput = value;
    this.historyManager.add(value);
    const word1 = value.split(" ")[0];
    const word2 = value.split(" ")[1];
    const word3 = value.split(" ")[2];
    this.emit([word1, word2, word3]);
    this.historyManager.resetPointer();
    callback();
  };
  Terminal.prototype.finalize = function() {
    this.GUI_manager.focusInput();
  };
  Terminal.prototype.init = function() {
    const self = this;
    this.GUI_manager.init(function(...args) {
      self.handleInput(...args);
    });
    function handleHistory(e) {
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown")
        return;
      if (e.key === "ArrowUp") {
        self.historyManager.navigate("prev");
      } else if (e.key === "ArrowDown") {
        self.historyManager.navigate("next");
      }
      self.GUI_manager.setInputValue(self.historyManager.getPointedValue());
      self.GUI_manager.moveInputCursorToTheEnd();
    }
    this.GUI_manager.addInputListener("onkeydown", handleHistory);
    this.GUI_manager.finalize();
    this.$root.appendChild(this.GUI_manager.getRoot());
    this.finalize();
    this.initialized = true;
  };
  var Terminal_default = Terminal;

  // src/index.js
  var src_default = Terminal_default;
})();
//# sourceMappingURL=bundle.js.map
