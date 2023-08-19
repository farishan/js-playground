import mouseDriver from "../index";

mouseDriver.on('mousedown', 'test1', payload => {
    console.log(payload, mouseDriver.getState())
    mouseDriver.debug()
})
mouseDriver.on('mouseup', 'test1', payload => {
    console.log(payload, mouseDriver.getState())
})
mouseDriver.on('mousemove', 'test1', payload => {
    console.log(payload, mouseDriver.getState())
})
// mouseDriver.run()