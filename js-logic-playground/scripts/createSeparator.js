function createSeparator(innerHTML = '&#10151;') {
    const s = document.createElement('span')
    s.innerHTML = innerHTML
    s.style.fontSize = '48px'
    s.style.lineHeight = '24px'
    return s
}