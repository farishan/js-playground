function createInput(title, onchange, target) {
    const i = document.createElement('input')
    i.title = `[input] ${title}`
    i.type = 'checkbox'

    i.onchange = onchange

    target.append(i)

    return i
}