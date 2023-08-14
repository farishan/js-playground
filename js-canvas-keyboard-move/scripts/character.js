var dummyImage = new Image();
dummyImage.src = "dummy.png";

var dummyw = new Image();
dummyw.src = "dummy_walk.png";

var char = {
	img: dummyImage,
	img_walk: dummyw,

	activity: 'idling',
	flip: false,
	frameCount: 0,

	x: _mw/2,
	y: _mh/2,
	w: 50,
	h: 50,
	dir: null,
	
	x_spd: 1,
	y_spd: 1,

	spd: 0,

	acc: 0.1,
	dcc: 0.5,
	max_spd: 5,
	
	live: function(){
		this.animate();
		this.readyToMove();
	},
	move: function(dir){
		var d = this.r*2;
		var edge = {
			left: this.x > 0 == false,
			right: this.x+this.w < _mw == false,
			up: this.y > 0 == false,
			down: this.y+this.h < _mh == false
		}

		if(dir && dir != this.dir){
			if(dir != this.dir){
				// this.x_spd = 0;
				// this.y_spd = 0;
			}
			this.dir = dir;
		}

		if(this.dir == 'left'){
			this.flip = true;
			if(!edge.left){
				this.x-=this.x_spd;
			}else{
				this.x = 0;
			}
		}else if(this.dir == 'up'){
			if(!edge.up){
				this.y-=this.y_spd;
			}else{
				this.y = 0;
			}
		}else if(this.dir == 'right'){
			this.flip = false;
			if(!edge.right){
				this.x+=this.x_spd;
			}else{
				this.x = _mw-this.w;
			}
		}else if(this.dir == 'down'){
			if(!edge.down){
				this.y+=this.y_spd;
			}else{
				this.y = _mh-this.h;
			}
		}
	},
	readyToMove(){
		if(this.activity == 'moving'){
			if(this.spd < this.max_spd){
		    	this.spd += this.acc;
	    	}else{
	    		this.spd = this.max_spd;
	    	}

	    	if(this.x_spd < this.max_spd){
		    	this.x_spd += this.acc;
	    	}else{
	    		this.x_spd = this.max_spd;
	    	}

	    	if(this.y_spd < this.max_spd){
		    	this.y_spd += this.acc;
	    	}else{
	    		this.y_spd = this.max_spd;
	    	}


			// console.log('moving to '+this.dir+' with '+this.spd+' speed.');
		}else if(this.activity != 'moving'){
	    	if(this.spd > 0){
	    		this.spd -= this.dcc;
	    	}else{
	    		this.spd = 0;
	    	}

	    	if(this.x_spd > 0){
	    		this.x_spd -= this.dcc;
	    	}else{
	    		this.x_spd = 0;
	    	}

	    	if(this.y_spd > 0){
	    		this.y_spd -= this.dcc;
	    	}else{
	    		this.y_spd = 0;
	    	}
		}
		this.move(this.dir);
	},
	animate(){
		this.frameCount+=0.9;
		if(this.activity == 'idling'){
			renderImage(this.img, this);
			// console.log('idling...')
		}

		if(this.activity == 'moving'){
			renderImage(this.img_walk, this);
		}
	}
};

var idleFC = 0.1;
var frameSize = 48;
function renderImage(img, obj){
	var frames = [0, frameSize, frameSize*2, frameSize*3];
	var frame = 0;

	if(obj.frameCount<=5){
		frame = 0;
	}
	else if(obj.frameCount>5 && obj.frameCount<=10){
		frame = 1;
	}
	else if( obj.frameCount>10 && obj.frameCount<=15 ){
		frame = 2;
	}
	else if( obj.frameCount>15 )
	{
		frame = 3;
		if(obj.frameCount>20){
			obj.frameCount = 0;
		}
	}

	flipCheck(frames[frame]);

	function flipCheck(n){
		if(!obj.flip){
			c.drawImage(img, n, 0, frameSize, frameSize, obj.x, obj.y, obj.w, obj.h) 
		}else{
			c.save();
			c.translate(obj.x+obj.w, obj.y)
			c.scale(-1, 1);
			c.drawImage(img, n, 0, frameSize, frameSize, 0, 0, obj.w, obj.h) 
			c.restore();
		}
	}
}