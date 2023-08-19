var maxListLength = 100;
var maxDiff = 200;

var app = new Vue({
	el: '#app',
	data: function(){
		return {
			level: 0,
			exp: 0,
			exp_linear: [],
			diff: 100,
			listLength: 0
		}
	},
	mounted(){

		console.log(this.exp_linear)
	},
	methods: {
		generate(){
			this.exp_linear = [];
			if(this.listLength<=maxListLength && this.diff<=maxDiff){
				for (var i = 0; i < this.listLength; i++) {
					var level = i+1;
					var diff = i*this.diff;

					// console.log(i, (i*i+i+3)*4)

					if(i === 0){
						this.exp_linear.push({
							level: 1,
							exp: 0
						});
					}else{
						this.exp_linear.push({
							level: level,
							exp: this.exp_linear[i-1].exp+diff
						});
					}
				}
			}else{
				alert('Too much. Your browser will chrashed. Trust me.');
			}
		},
		checkLevel(){
			for (var i = 0; i < this.exp_linear.length; i++) {
				if(this.exp >= this.exp_linear[i].exp && this.exp <= this.exp_linear[i+1].exp){
					this.level = i+1;
				}
			}
		},
		checkExp(){
			for (var i = 0; i < this.exp_linear.length; i++) {
				if(this.level == this.exp_linear[i].level){
					this.exp = this.exp_linear[i].exp;
				}
			}
		},
		setMaxLength(){
			this.listLength = maxListLength;
		},
		setMaxDiff(){
			this.diff = maxDiff;
		},
		reset(){
			this.level = 0;
			this.exp = 0;
			this.exp_linear = [];
			this.diff = 100;
			this.listLength = 0;
		}
	}
});