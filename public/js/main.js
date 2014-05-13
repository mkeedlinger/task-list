// 'command' file


window.onload = function(event) {
	// puts the original li on the page
	addLiLast();
};

window.onkeydown = function(event){
	// mke.info(event.keyCode);
	windowKeydownSwitch(event);
};

setTimeout(function() {
	cubeKeeper =  document.getElementsByClassName('cube')[0];
	setTimeout(function() {
		hideCover();
	}, 10)
}, 50);