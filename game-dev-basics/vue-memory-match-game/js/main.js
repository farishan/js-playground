
var app = new Vue({
	el: '#app',
	data: {
		defaultCard: 'img/default.png',
		isSelecting: false,
		selected: [],
		matched: [],
		cards: [],
		gameIsOver: false,
		turns: 0,
		status: ' ',
		elapsed: 0,
		timer: undefined
	},
	mounted(){
		this.start();
	},
	methods: {
		start: function(e){
			var self = this;

			// reset
			this.gameIsOver = false;
			this.elapsed = 0;

			if(this.timer){
				clearInterval(this.timer)
			}

			function loop(){
				self.elapsed++;
			}

			this.timer = setInterval(loop, 1000);

			card_database.map((card, i)=>{
				this.cards.push({
					id: card.id+i+'yin',
					src: card.src,
					selected: false,
					matched: false
				});
				this.cards.push({
					id: card.id+i+'yang',
					src: card.src,
					selected: false,
					matched: false
				});
			})
			this.cards = shuffle(this.cards);
		},
		clickedCard: function(e, card){
			if (card.selected){
				console.log('card was clicked')
			} else {
				card.selected = true;

				// change user state
				this.isSelecting = true;

				// add selected class to clicked card
				e.target.parentNode.parentNode.classList.add('selected');

				if (this.selected.length==1){
					this.selected.push(card);
					this.checkCard();
				} else {
					this.selected.push(card);
				}
			}
		},
		checkCard: function(){
			console.log('checking card...')
			
			var card1 = this.selected[0];
			var card2 = this.selected[1];
			if (card1.src == card2.src){
				console.log('match')
				this.status = "match!";
				this.cards.map((card, i)=>{
					if(card.id == card1.id || card.id == card2.id){
						card.matched = true;
						this.matched.push(card);
					}
				});
			}else{
				console.log('not match')
				this.isSelecting = false;
			}

			// reset card after 750ms
			var t = this;
			setTimeout(function(){
				t.turns+=1;
				t.resetCards();
			}, 750);
		},
		resetCards: function(){
			console.log('reset cards')

			// reset selected card container & matched card container
			this.selected = [];

			var s_cards = document.getElementsByClassName('card');
			this.cards.map((card, i)=>{
				if(!card.matched){
					// if not matched yet, flip back again
					card.selected = false;
					s_cards[i].classList.remove('selected');	
				}
			});
			
			if(this.matched.length==this.cards.length){
				this.gameOver(true);
			}else{
				this.gameOver(false);
			}
		},
		gameOver: function(win){
			if(win){
				console.log('you win')
				this.gameIsOver = true;
				clearInterval(this.timer);
				this.status = ' ';
			}else{
				console.log('you lose')
			}
		},
		restart: function(e){
			var s_cards = document.getElementsByClassName('card');
			this.cards.map((card, i)=>{
				s_cards[i].classList.remove('selected');
			});
			this.cards = [];
			this.isSelecting = false;
			this.selected = [];
			this.matched = [];
			this.turns = 0;
			this.elapsed = 0;

			var t = this;
			setTimeout(function(e){
				t.start();
			}, 100);
		}
	},
	watch: {
		isSelecting: function(e){
			if(this.isSelecting){
				console.log('user is selecting...')
				this.status = 'selecting card...';
			}else{
				console.log('stop selecting.')
				this.status = ' ';
			}
		}
	}
});

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
