; (() => {
    const ROOT = document.body

    const root = createCard('Buffer')
    const process = (i1) => i1

    const a = createInput('a', update, root)
    const separator = createSeparator()
    root.append(separator)
    const b = createOutput('b', root)

    function update() {
        b.checked = process(a.checked)
    }

    update()

    ROOT.append(root)
})()
