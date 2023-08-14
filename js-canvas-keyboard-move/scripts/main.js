var rx = random(0, _mw);
var ry = random(0, _mh);

function drawRandomRect(){
	c.fillRect(rx, ry, random(100, 100), random(100, 100));
}

function drawRandomCircle(){
	c.beginPath();
	c.arc(random(0, _mw), random(0, _mh), 5, 0, 2*Math.PI);
	c.strokeStyle = '#ccf';
	c.stroke();
	c.closePath();
}

function animate(){
	//CONTROLLER
    if (keyState[37] || keyState[65]){char.move('left'); char.activity = 'moving';}    
    if (keyState[39] || keyState[68]){char.move('right'); char.activity = 'moving';}
    if (keyState[38] || keyState[87]){char.move('up'); char.activity = 'moving';}
    if (keyState[40] || keyState[83]){char.move('down'); char.activity = 'moving';}

	c.clearRect(0, 0, _mw, _mh);
	drawRandomCircle();
	drawRandomRect();

	char.live();
	
	setTimeout(function(){
		if(_running){ animate(); }
	}, 1000/fps);
}

// ===

// run the game
animate();

// activate keyboard control
keyboardController(true);

// ===

