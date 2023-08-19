var game = {
	start: function(e){
		console.log('start game')
	},
	render: function(e){
		setInterval(function(e){
			$('#result').html(player.coin);
			$('#coinsPS').html(player.coin_per_second);
			$('#coinsPS2').html(player.coin_per_second+10);
			$('#coinsPC').html(player.coin_per_click);
			$('#coinsPC2').html(player.coin_per_click+1);
			$('#costPC').html(costPC);
			$('#costPS').html(costPS);
		}, renderSpeed);
	}
}