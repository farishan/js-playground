function setup() {
     createCanvas(600, 400);
}

var on = false;
var on2 = false;

function mousePressed() {
	if (mouseX > 125 && mouseX < 175 && 
    	mouseY > 175 && mouseY < 225) {
		on = !on;
		if (on2 = true){on2 = false;}

	}
	if (mouseX > 425 && mouseX < 475 && 
    	mouseY > 175 && mouseY < 225) {
    	on2 = !on2;
    	if (on = true){on = false;}


    }
    	
    }

function draw() {
    
    background(0);
    
    ellipseMode(CENTER);
    rectMode(CENTER);
    fill(0);
    stroke(255);
    strokeWeight(4);
    
    if (on) {
    	background(0, 255, 0)
	} 
	if (on2) {
    	background(255, 100, 0)
	} 
    
    if (mouseX > 125 && mouseX < 175 && 
    	mouseY > 175 && mouseY < 225) {
    	fill(255);
    }
    rect(150, 200, 50, 50);

    fill(0);
    if (mouseX > 425 && mouseX < 475 && 
    	mouseY > 175 && mouseY < 225) {
    	fill(255);
    }
    rect(450, 200, 50, 50);

    var counter = 0;
    var ey = 200;
    
}