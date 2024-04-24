export class SignalSink {
  value: Bit = 0
  listeners: Listener[] = []

  constructor(defaultValue?: Bit) {
    if (defaultValue) this.value = defaultValue
  }

  set(newValue: Bit) {
    this.value = newValue

    for (let index = 0; index < this.listeners.length; index++) {
      const listener = this.listeners[index];
      listener(newValue)
    }
  }
  get() {
    return this.value
  }
  addListener(listener: Listener) {
    this.listeners.push(listener)
  }
}
