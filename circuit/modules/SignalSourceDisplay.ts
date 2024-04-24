export class SignalSourceDisplay {
  dom = document.createElement('div')
  checkbox = document.createElement('input')
  onChange = (value: boolean) => { }

  constructor(value: Bit = 0) {
    const label = document.createElement('label')
    label.innerHTML = 'signal source'

    this.checkbox.type = 'checkbox'
    this.checkbox.checked = value ? true : false
    this.checkbox.onchange = (e: Event) => {
      let $event: Event = e
      this.onChange((<HTMLInputElement>$event.target).checked)
    }
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
