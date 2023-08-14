; (() => {
    const ROOT = document.body

    const root = createCard('NAND')
    const process = (i1, i2) => !(i1 && i2)

    const a = createInput('a', update, root)
    const b = createInput('b', update, root)
    const separator = createSeparator()
    root.append(separator)
    const c = createOutput('c', root)

    function update() {
        c.checked = process(a.checked, b.checked)
    }

    update()

    ROOT.append(root)
})()
