import FunctionManager from '../src/index'

const functionManager = new FunctionManager()

functionManager.register({
    key: 'appBooter',
    value: function (payload) {
        console.log('app booter executed!', payload)
    }
})

functionManager.listen({
    functionKey: 'appBooter',
    listenerKey: 'myListener',
    callback: (payload) => {
        console.log('from client myListener: ', payload)
    }
})

functionManager.execute({ key: 'appBooter', payload: { hello: 'world!' } })