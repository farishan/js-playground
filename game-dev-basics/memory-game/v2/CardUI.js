function CardUI(card = {}, config = {}) {
    const { id, value } = card
    const { isSelected, isPaired } = config

    let listenersByEvent = {}

    const cardUI = document.createElement('div')
    cardUI.style.border = '1px solid'
    cardUI.style.padding = '1rem'

    // dynamic style
    if (isPaired) {
        cardUI.style.color = 'green'
    } else if (isSelected) {
        cardUI.style.color = 'blue'
    } else {
        cardUI.style.cursor = 'pointer'
    }

    // card content
    if (isPaired || isSelected) {
        cardUI.innerHTML = id + ' ' + value
    } else {
        cardUI.innerHTML = id + ' [click to reveal value]'
    }

    // interaction
    cardUI.onclick = function () {
        if (listenersByEvent.click) {
            listenersByEvent.click.forEach(func => {
                func(card)
            });
        }
    }

    this.addEventListener = function (key, func) {
        if (!listenersByEvent[key]) listenersByEvent[key] = []
        listenersByEvent[key].push(func)

        return listenersByEvent[key]
    }

    this.get = function () {
        return cardUI
    }

    return this
}