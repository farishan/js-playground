; (() => {
    const ROOT = document.body

    const root = createCard('ADDER')
    const process = useADDERHALF

    const a = createInput('a', update, root)
    const inputSeparator = createSeparator('+')
    root.append(inputSeparator)
    const b = createInput('b', update, root)
    const carrySeparator = createSeparator('|')
    root.append(carrySeparator)
    const cOut = createOutput('carry', root)
    root.append(carrySeparator.cloneNode(carrySeparator))
    const s = createOutput('sum', root)

    function update() {
        const [sum, carry] = process(a.checked, b.checked)
        cOut.checked = carry
        s.checked = sum
    }

    update()

    ROOT.append(root)
})()
