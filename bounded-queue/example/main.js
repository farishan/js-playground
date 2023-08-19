import Queue from "../dist/bundle.js";

function format(queue) {
    const str = queue.toString()
    const splitted = str.split('<')

    return `${splitted[0]} < <b>${splitted[1]}</b> < ${splitted[2]}`
}

document.write(`<ol>`)

const queue = new Queue(3)
document.write(`<li>queue created: ${format(queue)}</li>`)

document.write(`<li>enqueue "alpha"...</li>`)
queue.enqueue('alpha')
document.write(`<li>queue: ${format(queue)}</li>`)

document.write(`<li>enqueue "beta"...</li>`)
queue.enqueue('beta')
document.write(`<li>queue: ${format(queue)}</li>`)

document.write(`<li>enqueue "charlie"...</li>`)
queue.enqueue('charlie')
document.write(`<li>queue: ${format(queue)}</li>`)

document.write(`<li>dequeueing...</li>`)
queue.dequeue()
document.write(`<li>queue: ${format(queue)}</li>`)

document.write(`<li>enqueue "alpha" again...</li>`)
queue.enqueue('alpha')
document.write(`<li>queue: ${format(queue)}</li>`)

document.write(`<li>enqueue "delta"...</li>`)
queue.enqueue('delta')
document.write(`<li>queue: ${format(queue)}</li>`)

document.write(`<li>dequeueing...</li>`)
queue.dequeue()
document.write(`<li>queue: ${format(queue)}</li>`)

document.write(`<li>dequeueing...</li>`)
queue.dequeue()
document.write(`<li>queue: ${format(queue)}</li>`)

document.write(`<li>dequeueing...</li>`)
queue.dequeue()
document.write(`<li>queue: ${format(queue)}</li>`)

document.write(`<li>dequeueing...</li>`)
queue.dequeue()
document.write(`<li>queue: ${format(queue)}</li>`)

document.write(`<li>dequeueing...</li>`)
queue.dequeue()
document.write(`<li>queue: ${format(queue)}</li>`)

document.write(`<ol>`)