function Game(cardValues) {
    const self = this

    let selectedCardIds = []
    let pairedCardIds = []

    this.UIRoot = document.createElement('div')
    this.deck = new Deck(cardValues)

    this.init = function () {
        this.deck.generateCards().shuffle()
        this.renderCards()
        document.body.appendChild(this.UIRoot)
    }

    this.selectCard = function (card) {
        const isSelected = selectedCardIds.indexOf(card.id) > -1
        const isPaired = pairedCardIds.indexOf(card.id) > -1

        /* ignore click if:
            - card is already selected or paired, or
            - selected card storage is full
        */
        if (isSelected || isPaired) return
        if (selectedCardIds.length > 1) return

        selectedCardIds.push(card.id)

        if (selectedCardIds.length > 1) {
            const card1 = self.deck.cards.find(c => c.id === selectedCardIds[0])
            const card2 = self.deck.cards.find(c => c.id === selectedCardIds[1])

            const isMatched = card1.value === card2.value

            setTimeout(function () {
                if (isMatched) {
                    pairedCardIds.push(selectedCardIds[0])
                    pairedCardIds.push(selectedCardIds[1])
                }

                selectedCardIds = []
                self.renderCards()
            }, 1000)
        }

        self.renderCards()
    }

    this.renderCards = function () {
        self.UIRoot.innerHTML = ''
        self.deck.cards.forEach(card => {
            const cardUI = new CardUI(card, {
                isSelected: selectedCardIds.indexOf(card.id) > -1,
                isPaired: pairedCardIds.indexOf(card.id) > -1
            })
            cardUI.addEventListener('click', self.selectCard)
            self.UIRoot.appendChild(
                cardUI.get()
            )
        });
    }
}