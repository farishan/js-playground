var app = new Vue({
	el: '#app',
	data: function(){
		return {
			listLength: 0,
			min: 0,
			max: 0,
			list: []
		}
	},
	mounted(){

	},
	methods: {
		generate(){
			if(this.listLength<100){
				if(this.listLength%2==0){
					this.listLength++;
				}

        /* oastbn.js usage */
				this.list = oasbtn(this.min, this.max, this.listLength);

				console.log(this.list)
			}
		}
	}
});
