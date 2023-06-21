const EmptyPrototype = Object.create(null)
EmptyPrototype.prototype = EmptyPrototype

const empty = Object.create(EmptyPrototype)
console.log(empty)

// const HolderPrototype = {
//     value: 0
// }

// const EmitterPrototype = {
//     emit: function(data) {
//         console.log('emitted: ', data)
//     }
// }

// const ReceiverPrototype = {
//     receive: function(data) {
//         console.log('received: ', data)
//     }
// }

// const InputPrototype = Object.assign(EmptyPrototype, HolderPrototype)
// Object.assign(InputPrototype, EmitterPrototype)
// Object.assign(InputPrototype, ReceiverPrototype)

// const OutputPrototype = Object.assign(EmptyPrototype, ReceiverPrototype)

// const input = Object.create(InputPrototype)
// const output = Object.create(OutputPrototype)
// // console.log(input.value)
// input.receive = function(data) {
//     console.log('input receive:', data)
//     input.value = data
//     input.emit(data)
//     output.receive(data)
// }

// input.receive(1)
// input.receive(0)
// console.log(input)