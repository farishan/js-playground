function createCard(title) {
    const card = document.createElement('div')
    card.style.outline = '1px solid'
    card.style.padding = '4px'
    card.style.display = 'inline-block'

    const titleDisplay = document.createElement('div')
    titleDisplay.innerHTML = title
    card.append(titleDisplay)

    return card
}