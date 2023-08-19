$(document).ready(function(e){
	game.start();
	game.render();
})

function openNew(){window.open("file:///home/doesit/Dev(Game)/ver.0.theBox/index.html", "", "toolbar=yes,scrollbars=yes,resizable=yes,top=10,left=450,width=1200,height=900");}
function show(id){$(id).toggle();}

function buttonDisplay(id1,id2){
	$(id1).attr('style', 'display:none;');
	$(id2).attr('style', 'display:inline-block;');
}
function buttonDisplay2(id1,id2,id3,id4){
	$(id1).attr('style', 'display:none;');
	$(id2).attr('style', 'display:inline-block;');
	$(id3).attr('style', 'display:inline-block;');
	$(id4).attr('style', 'display:inline-block;');
}
function add(){player.coin += player.coin_per_click;game.render();}

// ------------------------UPGRADE----------------------

function upgradeGlow(glow){
	if (player.coin >= 100) {
	player.coin -= 100;
	buttonDisplay('#upgradeGlow','#Glow');
	game.render();
	}else{alert('Sorry, not enough coins.');}
}
function Glow(glow){
	if(glow==='pink'){
		$('#thebox').attr('style','box-shadow:0px 0px 100px '+glow+';');
	}else{
	$('#thebox').attr('style','box-shadow:0px 0px 20px '+glow+';');
	}
}
function upgradeTransparent(){
	if (player.coin >= 100) {
		player.coin -= 100;
		buttonDisplay("#upgradeTransparent","#Transparent");
		game.render();	
	}else{alert('Sorry, not enough coins.');}	
}
function Transparent(){$('#thebox').attr('style','background-color:rgba(0,0,0,0);');}

function upgradeButtonSize(){
	if (player.coin >= 70) {
	player.coin -= 70;
	buttonDisplay2('#upgradeSize','#Big','#Small','#Bubble');
	game.render();
	}else {alert('Sorry, not enough coins.');}
}
function ButtonSize(size,margintop,radius){document.getElementById('thebox').setAttribute('style', 'width:'+size+'; height:'+size+'; margin-top:'+margintop+'; border-radius:'+radius+';');}

function upgradeButtonColor(color){
	if (player.coin >= 50) {
	player.coin -= 50;
	$('#upgradeColor').attr('style', 'display:none;');
	$('#Red').attr('style', 'display:inline-block;');
	$('#Blue').attr('style', 'display:inline-block;');
	$('#Yellow').attr('style', 'display:inline-block;');
	game.render();
	}else {alert('Sorry, not enough coins.');}
}
function ButtonColor(color){
	$('#thebox').attr('style', 'background-color:'+color+';');
}
function upgradeClick(){
	if (player.coin >= costPC){
		player.coin_per_click += 1;
		player.coin -= costPC;
		player.coin_per_click += 2;
		game.render();
	}else {alert('Sorry, not enough coins.');}
}
function upgradeCPS(){
	if (player.coin >= player.coin_per_second) {
		player.coin_per_second += 10;
		player.coin -= player.coin_per_second;
		player.coin_per_second += 20;
		game.render();
	}else {alert('Sorry, not enough coins.');}
}
setInterval(function coinPS(){
	player.coin += player.coin_per_second;
}, 1000);

// ----------------------------UPGRADE end----------------------------

function swapStylesheet(sheet){
	$('#stylesheet').attr("href",sheet);
	if (sheet==='./styles/dark.css'){
		$('#Classic').attr("onclick","ButtonColor('white');");
		$('#Glow').attr("onclick","Glow('pink');");
	}else{
		$('#Classic').attr("onclick","ButtonColor('black');");
		$('#Glow').attr("onclick","Glow('gold');");
	}
}

// setInterval(function BERUBAH(){
// 	$('#stylesheet').attr("href","./styles/style.css");
// }, 2000);

// setInterval(function BERUBAH2(){
// 	$('#stylesheet').attr("href","./styles/dark.css");
// }, 2500);



// ALERT
var alert_output = document.getElementById('alert');

var color_success = 'green';
var color_loading = 'gold';
var color_error = 'red';

var message_success = 'success';
var message_loading = 'please wait';
var message_error = 'error';

function alertCustom(type, msg){
	alert_output.setAttribute('style', 'display:block');
	if (type == 'success') {
		alert_output.style.color = color_success;
	}
	else if (type == 'loading') {
		alert_output.style.color = color_loading;
	}
	else if (type == 'error') {
		alert_output.style.color = color_error;
	}
	alert_output.innerHTML = msg;	
}