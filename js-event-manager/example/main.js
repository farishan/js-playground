import EventManager from '../bundle'

const eventManager = new EventManager()

eventManager.on('test', function(payload) {
    console.log('testing...', payload)
})

eventManager.emit('test', 'hello world')

eventManager.off('test')

eventManager.emit('test', 'hello world')

console.log(eventManager)