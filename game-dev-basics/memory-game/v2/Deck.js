function Deck(values) {
    this.cards = []

    this.generateCards = function () {
        this.cards =
            // double the card values to create a pairset
            new Array(...values, ...values)
                .map(value => new Card(value))

        return this
    }

    this.shuffle = function () {
        util.shuffleArray(this.cards)

        return this
    }
}