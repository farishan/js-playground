export class WireDisplay {
  dom = document.createElement('div')

  constructor(value: Bit = 0) {
    this.dom.style.width = '100px'
    this.dom.style.height = '1px'
    this.setColor(value)
  }

  setColor(value: Bit) {
    this.dom.style.background = value ? 'green' : '#ddd'
  }

  set(value: Bit) {
    this.setColor(value)
  }

  getDOM() {
    return this.dom
  }
}
