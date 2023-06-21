function receive(data) {
    console.log('received: ',data)
}

function Receiver() {
    this.receive = receive
}

