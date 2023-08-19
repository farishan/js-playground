import processor from "../src";

processor.setOption('debug', true)

processor.register('myprocess', (payload, callback) => {
    console.log('myprocess invoked.', payload)
    callback({...payload, processed: true})
    console.log('myprocess invoked done.', payload)
})

processor.process('myprocess', { hello: 'world' }, (payload) => {
    console.log('myprocess callback started.')
    console.log(payload)
    console.log('myprocess callback is done.')
})