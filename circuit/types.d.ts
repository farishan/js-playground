type Bit = 0 | 1
type Listener = (bit: Bit) => void
type WireSettings = {
  source: {
    addListener: (fn: (value: Bit) => void) => void
  },
  sink: {
    set: (value: Bit) => void
  }
}
