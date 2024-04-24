// modules/SignalSink.ts
class SignalSink {
  value = 0;
  listeners = [];
  constructor(defaultValue) {
    if (defaultValue)
      this.value = defaultValue;
  }
  set(newValue) {
    this.value = newValue;
    for (let index = 0;index < this.listeners.length; index++) {
      const listener = this.listeners[index];
      listener(newValue);
    }
  }
  get() {
    return this.value;
  }
  addListener(listener) {
    this.listeners.push(listener);
  }
}

// modules/SignalSinkDisplay.ts
class SignalSinkDisplay {
  dom = document.createElement("div");
  checkbox = document.createElement("input");
  constructor(value = 0) {
    const label = document.createElement("label");
    label.innerHTML = "signal sink";
    this.checkbox.type = "checkbox";
    this.checkbox.checked = value ? true : false;
    this.checkbox.readOnly = true;
    this.checkbox.disabled = true;
    label.append(this.checkbox);
    this.dom.append(label);
  }
  set(value) {
    this.checkbox.checked = value ? true : false;
  }
  getDOM() {
    return this.dom;
  }
}

// modules/SignalSource.ts
class SignalSource {
  value = 0;
  listeners = [];
  constructor(defaultValue) {
    if (defaultValue)
      this.value = defaultValue;
  }
  set(newValue) {
    this.value = newValue;
    for (let index = 0;index < this.listeners.length; index++) {
      const listener = this.listeners[index];
      listener(newValue);
    }
  }
  get() {
    return this.value;
  }
  addListener(listener) {
    this.listeners.push(listener);
  }
}

// modules/SignalSourceDisplay.ts
class SignalSourceDisplay {
  dom = document.createElement("div");
  checkbox = document.createElement("input");
  onChange = (value) => {
  };
  constructor(value = 0) {
    const label = document.createElement("label");
    label.innerHTML = "signal source";
    this.checkbox.type = "checkbox";
    this.checkbox.checked = value ? true : false;
    this.checkbox.onchange = (e) => {
      let $event = e;
      this.onChange($event.target.checked);
    };
    label.append(this.checkbox);
    this.dom.append(label);
  }
  set(value) {
    this.checkbox.checked = value ? true : false;
  }
  getDOM() {
    return this.dom;
  }
}

// modules/Wire.ts
class Wire {
  constructor(settings) {
    const source = settings?.source;
    const sink = settings?.sink;
    source.addListener((value) => {
      console.log("new value:", value);
      sink.set(value);
    });
  }
}

// modules/WireDisplay.ts
class WireDisplay {
  dom = document.createElement("div");
  constructor(value = 0) {
    this.dom.style.width = "100px";
    this.dom.style.height = "1px";
    this.setColor(value);
  }
  setColor(value) {
    this.dom.style.background = value ? "green" : "#ddd";
  }
  set(value) {
    this.setColor(value);
  }
  getDOM() {
    return this.dom;
  }
}

// main.ts
var signalSource = new SignalSource;
var signalSourceDisplay = new SignalSourceDisplay;
var signalSink = new SignalSink;
var signalSinkDisplay = new SignalSinkDisplay;
new Wire({
  source: signalSource,
  sink: signalSink
});
var wireDisplay = new WireDisplay;
signalSourceDisplay.onChange = (value) => signalSource.set(value ? 1 : 0);
signalSource.addListener((value) => {
  signalSourceDisplay.set(value);
  wireDisplay.set(value);
});
signalSink.addListener((value) => {
  signalSinkDisplay.set(value);
});
signalSource.set(1);
var circuitDisplay = document.createElement("div");
circuitDisplay.style.display = "inline-flex";
circuitDisplay.style.alignItems = "center";
circuitDisplay.style.border = "1px solid";
circuitDisplay.append(signalSourceDisplay.getDOM());
circuitDisplay.append(wireDisplay.getDOM());
circuitDisplay.append(signalSinkDisplay.getDOM());
document.body.append(circuitDisplay);
