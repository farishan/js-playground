// oasbtn = Odd Arithmetic Sequence Between Two Number
function oasbtn(a, b, l){
	var a = parseInt(a);
	var b = parseInt(b);
	var l = parseInt(l);
	var r = [];
	var d = b-((b+a)/2);
	if(l%2 == 0){
		r = false;
	}else{
		var k = 0;
		for (var i = 0; i <= l; i++) {
			if(i%2==1 && i>3){
				k++;
			}
		}
		var nd = d/(k+1);
		for (var i = 0; i < l; i++) {
			r.push(a + nd*i);
		}
	}
	return r;
}