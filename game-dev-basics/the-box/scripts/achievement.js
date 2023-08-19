function showAchievement(){
	if (coins>1000) {
		document.getElementById('thousand').setAttribute('style','display:inline-block');
	} 
	if (coins>30) {
		document.getElementById('thirties').setAttribute('style','display:inline-block');
	}
	if (coins>100) {
		document.getElementById('hundred').setAttribute('style','display:inline-block');
	}
}