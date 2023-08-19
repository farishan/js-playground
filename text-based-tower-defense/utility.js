define({
    darkmode: function () {
        const style = document.createElement('style')
        style.innerHTML = `
            body {
                background-color: #222222;
                color: #ffffff;
            }
        `
        document.head.appendChild(style)
    },
    use: function (name) {
        if (!this[name]) throw Error('Unknown utility.', name)

        return this[name]()
    }
})