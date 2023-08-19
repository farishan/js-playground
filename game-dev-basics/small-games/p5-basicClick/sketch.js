var bubble = {
    x : 300,
    y : 200
}

var saklar = false;

function setup(){
    createCanvas(600, 400)
}

function draw(){
    background(0);
    mybubble();
    efek()
}

function mybubble(){
    fill(255,100,0);
    stroke(255);
    strokeWeight(2);
    ellipse(bubble.x, bubble.y, 30, 30)
}

function mousePressed(){

    if(mouseX >= bubble.x-15 && mouseX <= bubble.x+15 &&
       mouseY >= bubble.y-15 && mouseY <= bubble.y+15)
    {saklar = true;} else { saklar = false }

}

function efek(){
    if (saklar){
        bubble.x = random(100, 500);
        bubble.y = random(100, 300)
    } else {
        bubble.x = 300;
        bubble.y = 200
    }
}
