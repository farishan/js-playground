function Suit(data){
	this.name = data.name;
	this.color = data.color;
	this.symbol = data.symbol;

	return this;
}

function Card(data){
	this.suit = data.suit;
	this.value = data.value;
	this.symbol = data.symbol;

	return this;
}

let deckFactory = (function(){
	function generateCards(limit, suits, options){
		var cards = [];

		for (var i = 0; i < suits.length; i++) {
			var suit = suits[i];

			for (var j = 1; j <= limit; j++) {
				var symbol;
				var value;

				symbol = j.toString()
				value = j

				for (var k = 0; k < options.length; k++) {
					options[k]

					if(j === options[k].num){
						symbol = options[k].symbol
						value = options[k].value;
					}
				}

				let card = new Card({suit: suit, value: value, symbol: symbol})

				cards.push(card)
			}
		}

		return cards;
	}

	return function(name, limit, suits, options){
		let deck = {
			name: name,
			cards: generateCards(limit, suits, options)
		};

		return deck;
	}
})();

let suits = [
	new Suit({name: 'Hearts', color: 'red', symbol: '&hearts;'}), 
	new Suit({name: 'Diamonds', color: 'red', symbol: '&diams;'}), 
	new Suit({name: 'Clubs', color: 'black', symbol: '&spades;'}), 
	new Suit({name: 'Spades', color: 'black', symbol: '&clubs;'}),
];

function renderCards(deck, container){
	for (var i = 0; i < deck.cards.length; i++) {
		var card = deck.cards[i]
		var div = document.createElement('div')
		div.classList.add('card')
		div.innerHTML = card.symbol + '<span style="color:' + card.suit.color + '">' + card.suit.symbol + '</span>'
		container.appendChild(div)
	}
}

// ===

var deckLimit = 13
var deckOptions = [
	{
		num: 1,
		symbol: 'A',
		value: deckLimit
	},
	{
		num: deckLimit-2,
		symbol: 'J',
		value: deckLimit-2-1
	},
	{
		num: deckLimit-1,
		symbol: 'Q',
		value: deckLimit-1-1
	},
	{
		num: deckLimit,
		symbol: 'K',
		value: deckLimit-1
	}
];

deck = deckFactory('French', deckLimit, suits, deckOptions);

renderCards(deck, document.getElementById('cards'))
