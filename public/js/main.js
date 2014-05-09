window.onload = function(event) {
	// puts the original li on the page
	addLiLast();
};

window.onkeydown = function(event){
	// console.log(event.keyCode);
	switch (event.keyCode){
		case 13: // enter key
			if (document.activeElement.getAttribute('type') === 'text'
				&& document.activeElement
				.parentElement.className === 'entireLi'
				&& document.activeElement
				.value != '') {
				addLiNext();
			};
			break;
		default:
			;
	}
}