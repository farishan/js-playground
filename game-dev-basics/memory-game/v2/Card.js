function Card(value) {
    this.id = Math.random().toString(36).slice(2, 9)
    this.value = value

    return this
}