// controller
function keyboardController(on){
	if(on){
		window.addEventListener('keydown', keydownHandle, true);    
		window.addEventListener('keyup', keyupHandle, true);
	}else{
		window.removeEventListener('keydown', keydownHandle, true);    
		window.removeEventListener('keyup', keyupHandle, true);

	}
}

function keydownHandle(e){
	keyState[e.keyCode || e.which] = true;
}

function keyupHandle(e){
	keyState[e.keyCode || e.which] = false;
	char.activity = 'idling';
	char.walking = false;
}

// random module
function random(n, m){
	return Math.floor(Math.random() * (m - n + 1)) + n;
}