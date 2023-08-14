function createBit(e) {
    console.log(e)
    let value = 0

    const dom = document.createElement('div')
    dom.style.display = 'flex'
    dom.style.flexDirection = 'column'
    dom.style.alignItems = 'center'
    dom.style.width = '48px'
    dom.style.height = '48px'
    dom.style.border = '1px solid'

    const display = document.createElement('input')
    display.readOnly = true
    display.style.textAlign = 'center'
    display.style.width = '100%'
    display.style.border = 'none'
    dom.append(display)

    const toggler = document.createElement('input')
    toggler.type = 'checkbox'
    toggler.style.width = '100%'
    toggler.style.margin = '1px 0 0 0'
    toggler.onchange = function (e) {
        value = e.target.checked
        render()
    }
    dom.append(toggler)

    function render() {
        display.value = value ? 1 : 0
        toggler.checked = value
    }

    render()

    return dom
}