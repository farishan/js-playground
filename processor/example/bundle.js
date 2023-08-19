(() => {
  // src/Processor.js
  function Processor(options = {}) {
    const self = this;
    this.debug = options.debug || false;
    this.processMap = /* @__PURE__ */ new Map();
    this.register = function(key, func) {
      if (this.debug)
        console.info("registering process...", key, func);
      this.processMap.set(key, func);
      if (this.debug)
        console.info("process registered:", key);
    };
    this.process = function(key, input, callback) {
      if (!key)
        throw Error("Invalid process key.");
      if (!self.processMap.has(key))
        throw Error("Unknown process.");
      if (this.debug)
        console.info("processing...", key);
      if (callback) {
        self.processMap.get(key)(input, callback);
      } else {
        self.processMap.get(key)(input);
      }
      if (this.debug)
        console.info("processed.", key);
    };
    this.setOption = function(key, value) {
      if (key === "debug") {
        this.debug = value || false;
      }
    };
    return this;
  }
  var Processor_default = Processor;

  // src/index.js
  var src_default = new Processor_default();

  // example/main.js
  src_default.setOption("debug", true);
  src_default.register("myprocess", (payload, callback) => {
    console.log("myprocess invoked.", payload);
    callback({ ...payload, processed: true });
    console.log("myprocess invoked done.", payload);
  });
  src_default.process("myprocess", { hello: "world" }, (payload) => {
    console.log("myprocess callback started.");
    console.log(payload);
    console.log("myprocess callback is done.");
  });
})();
//# sourceMappingURL=bundle.js.map
