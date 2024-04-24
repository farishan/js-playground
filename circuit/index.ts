import { SignalSource } from "./modules/SignalSource"

const signalSource = new SignalSource()

signalSource.listen((value: Bit) => {
  console.log('new value:', value)
})

signalSource.set(1)
