var world = {};






$(document).ready(function() {




	$(document).click(function(event) {

		$("#myHero").css("top", event.pageY + "px");
		$("#myHero").css("left", event.pageX + "px");


	});

	world.people = [];
	world.people.push({el: $("#monster1"), top:5, left:5, directionX: 1, directionY: 1});
	world.people.push({el: $("#monster2"), top:5, left:5, directionX: 1, directionY: 1});
	world.people.push({el: $("#monster3"), top:100, left:100, directionX: 1, directionY: 1});
	world.people.push({el: $("#monster4"), top:50, left:50, directionX: 1, directionY: 1});
	movePeople();

});

function movePeople(){

	for(num in world.people){
		var monster = world.people[num];

		monster.top = monster.top + (parseInt(Math.random()*10) *monster.directionY);
		monster.left = monster.left + (parseInt(Math.random()*10) *monster.directionX);

		if(Math.random>.95){person.directionY = -person.directionY;}
		if(Math.random>.95){person.directionX = -person.directionX;}
		if(Math.random<5){person.top = 5;}
		if(Math.random<5){person.left = 5;}
		if(Math.random>400){person.top = 400;}
		if(Math.random<600){person.left = 600;}


		monster.el.css("top", monster.top+"px");
		monster.el.css("left", monster.left+"px");



	}

	setTimeout(movePeople, 1000);

}
