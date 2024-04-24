export class Wire {
  constructor(settings: WireSettings) {
    const source = settings?.source
    const sink = settings?.sink

    source.addListener((value: Bit) => {
      console.log('new value:', value)
      sink.set(value)
    })
  }
}
