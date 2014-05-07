window.onload = function(event) {
	// create dom from db
};

window.onkeydown = function(event){
	/* this will get the enter key (or other key)
	that will make new task li */
	switch (event.keyCode){
		case 13: // enter key
			if (document.activeElement.getAttribute('type') === 'text'
				&& document.activeElement.parentElement.className === 'entireLi') {
				// addLiItem(event);
			};
			break;
		default:
			;
	}
}

function addLiItem (event) {
	console.log(event.target);
	var newLi = document.createElement('li'),
		newEntireLiDiv = document.createElement('div'),
		newRoundToggleDiv = document.createElement('div'),
		newInputCheckbox = document.createElement('input'),
		newCheckBoxLabel = document.createElement('label'),
		newInputText = document.createElement('input'),
		liUUID = UUID();
	// add classes to divs
	newEntireLiDiv.classList.add('entireLi');
	newRoundToggleDiv.classList.add('roundToggle');

	// checkbox
	newInputCheckbox.setAttribute('type', 'checkbox');
	newInputCheckbox.setAttribute('value', 'None');
	newInputCheckbox.setAttribute('id', liUUID);
	newInputCheckbox.setAttribute('name', 'checkbox');

	// label
	newCheckBoxLabel.setAttribute('for', liUUID);

	// textbox
	newInputText.setAttribute('type', 'text');
	newInputText.setAttribute('placeholder', ' Put a task here!');
}

function print (text) {
	console.log('MKEEDLINGER:', text);
}

function UUID () {
	/*returns UUID like this:
	"349645a6-d3da-4ca5-8dc9-29d197042219"*/
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
	function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
	});
}