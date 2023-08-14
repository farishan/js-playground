function createOutput(title, target) {
    const o = document.createElement('input')
    o.title = `[output] ${title}`
    o.type = 'checkbox'
    o.readOnly = true
    o.style.cursor = 'not-allowed'

    o.onclick = function (e) {
        e.preventDefault()
    }

    target.append(o)

    return o
}