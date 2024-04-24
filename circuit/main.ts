import { SignalSink } from "./modules/SignalSink"
import { SignalSinkDisplay } from "./modules/SignalSinkDisplay"
import { SignalSource } from "./modules/SignalSource"
import { SignalSourceDisplay } from "./modules/SignalSourceDisplay"
import { Wire } from "./modules/Wire"
import { WireDisplay } from "./modules/WireDisplay"

const signalSource = new SignalSource()
const signalSourceDisplay = new SignalSourceDisplay()

const signalSink = new SignalSink()
const signalSinkDisplay = new SignalSinkDisplay()

new Wire({
  source: signalSource,
  sink: signalSink
})
const wireDisplay = new WireDisplay()

signalSourceDisplay.onChange = (value) => signalSource.set(value ? 1 : 0)
signalSource.addListener((value: Bit) => {
  signalSourceDisplay.set(value)
  wireDisplay.set(value)
})

signalSink.addListener((value: Bit) => {
  signalSinkDisplay.set(value)
})

signalSource.set(1)

const circuitDisplay = document.createElement('div')
circuitDisplay.style.display = 'inline-flex'
circuitDisplay.style.alignItems = 'center'
circuitDisplay.style.border = '1px solid'

circuitDisplay.append(signalSourceDisplay.getDOM())
circuitDisplay.append(wireDisplay.getDOM())
circuitDisplay.append(signalSinkDisplay.getDOM())

document.body.append(circuitDisplay)
