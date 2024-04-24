export class SignalSinkDisplay {
  dom = document.createElement('div')
  checkbox = document.createElement('input')

  constructor(value: Bit = 0) {
    const label = document.createElement('label')
    label.innerHTML = 'signal sink'

    this.checkbox.type = 'checkbox'
    this.checkbox.checked = value ? true : false
    this.checkbox.readOnly = true
    this.checkbox.disabled = true
    label.append(this.checkbox)

    this.dom.append(label)
  }

  set(value: Bit) {
    this.checkbox.checked = value ? true : false
  }

  getDOM() {
    return this.dom
  }
}
