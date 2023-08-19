var ball = {
    x: 300,
    y: 200,
    xspeed: 5,
    yspeed: -4
}

function setup(){
    createCanvas(600,400)
}

function draw(){
    background(0);
    move();
    bounce();
    myball();
}


function bounce(){

    if (ball.x > width-25 || ball.x < 0+25) {
        ball.xspeed = ball.xspeed * -1;
    }

    if (ball.y > height-25 || ball.y < 0+25) {
        ball.yspeed = ball.yspeed * -1;
    }
}


function myball(){
    stroke(255);
    strokeWeight(2);
    fill(0,255,0);
    ellipse(ball.x,ball.y,50,50);
    
    
}

function move() {
  ball.x = ball.x + ball.xspeed;
  ball.y = ball.y + ball.yspeed;

}

