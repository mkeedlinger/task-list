// 'command' file

var socket;
window.onload = function(event) {
	// puts the original li on the page
	var cubeKeeper =  document.getElementsByClassName('cube')[0];
	
	socket = io.connect('http://localhost');

	socket.on('createInitList', function (data) {
		createInitList(data.list);
		setListDetails(data.id, data.name);
	});

	socket.on('updateClient', function (data) {
		;// update list from server
	})

};

window.onkeydown = function(event){
	windowKeydownSwitch(event);
};