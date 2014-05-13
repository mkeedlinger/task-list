// definition file



/*
######################
Functions
######################
*/

function addLiNext (textValue, checked, id) { // adds an li after the active li
	var newLi = createLi(),
	pastLi = document.activeElement.parentElement
	.parentElement;
	pastLi.insertAdjacentElement('afterend',newLi);
	pastLi.nextElementSibling
	.getElementsByTagName('input')[1].focus()
}

function addLiLast (textValue, checked, id) { // creates an li at the end of the ul
	var newLi = createLi(textValue, checked, id);
	document.getElementById('list')
	.firstElementChild.appendChild(newLi);
}

function createLi (textValue, checked, id) { // returns an li to be inserted in the ul
	var newLi = document.createElement('li'),
		newEntireLiDiv = document.createElement('div'),
		newRoundToggleDiv = document.createElement('div'),
		newInputCheckbox = document.createElement('input'),
		newCheckBoxLabel = document.createElement('label'),
		newInputText = document.createElement('input'),
		newButton = document.createElement('button'),
		globalUUID = id || mke.UUID(),
		randomUUID = mke.UUID();

	// add classes/id's
	newEntireLiDiv.classList.add('entireLi');
	newRoundToggleDiv.classList.add('roundToggle');
	newLi.id = globalUUID;

	// checkbox
	newInputCheckbox.setAttribute('type', 'checkbox');
	if (checked) {
		newInputCheckbox.setAttribute('checked', checked);
	} else {
		newInputCheckbox.removeAttribute('checked');
	};
	newInputCheckbox.setAttribute('id', randomUUID);
	newInputCheckbox.setAttribute('name', 'checkbox');

	// label
	newCheckBoxLabel.setAttribute('for', randomUUID);

	// textbox
	newInputText.setAttribute('type', 'text');
	newInputText.setAttribute('placeholder', ' Put a task here!');
	newInputText.value = textValue || '';
	newInputText.setAttribute('maxlength', '150');
	newInputText.onkeydown = textboxKeydownSwitch;

	// button
	newButton.setAttribute('data-uuid', globalUUID);
	newButton.textContent = 'Delete task';
	newButton.onclick = deleteTask;

	// put it all together
	newRoundToggleDiv.appendChild(newInputCheckbox);
	newRoundToggleDiv.appendChild(newCheckBoxLabel);
	newEntireLiDiv.appendChild(newRoundToggleDiv);
	newEntireLiDiv.appendChild(newInputText);
	newEntireLiDiv.appendChild(newButton);
	newLi.appendChild(newEntireLiDiv);
	return newLi;
}

function deleteTask () { // deletes the active li
	var currentLi = this.parentElement.parentElement;
	if (currentLi.parentElement.childElementCount > 1) {
		currentLi.remove();
	} else if (this.previousElementSibling !== ''
		&& currentLi.parentElement.childElementCount === 1) {
		this.previousElementSibling.value = '';
	};
}

function showCover () { // shows the cover
	var coverDiv = document.getElementById('coverDiv');
	coverDiv.appendChild(cubeKeeper);
	coverDiv.style.visibility = 'visible';
}
function hideCover () { // hides the cover
	document.getElementById('coverDiv')
	.style.visibility = 'hidden'
	document.getElementsByClassName('cube')[0].remove();
}

function isEntireLiTextbox () { // returns boolean of if the active element is the task textbox
	return document.activeElement.getAttribute('type') === 'text'
	&& document.activeElement
	.parentElement.className === 'entireLi'
}

function moveLiUp (ob) { // moves the active li above the one above it
	var innerInput = ob,
		movedLi = ob.parentElement.parentElement;
	movedLi.previousElementSibling
	.insertAdjacentElement('beforebegin', movedLi);
	innerInput.focus();
}

function moveLiDown (ob) { // moves the active li below the one below it
	var innerInput = ob,
		movedLi = ob.parentElement.parentElement;
	movedLi.nextElementSibling
	.insertAdjacentElement('afterend', movedLi);
	innerInput.focus();
}

function emptyLiCleaner () { // clears out all empty li's
	var list = document.getElementById('list'),
		removeList = [];
	list = list.getElementsByTagName('ul')[0];
	for (var i = 0; i < list.childElementCount; i++) {
		var textboxContents = list.children[i];
		textboxContents = textboxContents.getElementsByClassName('entireLi')[0];
		textboxContents = textboxContents.getElementsByTagName('input')[1]
		textboxContents = textboxContents.value;
		if (textboxContents.length === 0
			&& list.children[i] != list.lastElementChild) {
			removeList.push(list.children[i]);
		};
	}
	for (var i = 0; i < removeList.length; i++) {
		removeList[i].remove();
	}
}

function getTaskInfo () { // returns list with all info about tasks
	var list = document.getElementById('list'),
		returnList = [],
		omitList = [];
	list = list.getElementsByTagName('ul')[0];
	for (var i = 0; i < list.childElementCount; i++){
		var textboxContents = list.children[i];
		textboxContents = textboxContents.getElementsByClassName('entireLi')[0];
		textboxContents = textboxContents.getElementsByTagName('input')[1]
		textboxContents = textboxContents.value;

		var liInfo = {};
		liInfo.order = i;
		liInfo.uuid = list.children[i].id;
		liInfo.task = textboxContents;
		liInfo.checked = list.children[i]
			.getElementsByClassName('roundToggle')[0]
			.getElementsByTagName('input')[0].checked
		if (textboxContents != '') {
			returnList.push(liInfo);
		} else {
			omitList.push(liInfo);
		};
	}
	mke.info(omitList, 'Omitted because empty');
	return returnList
}

function createInitList () { // creates the list from db when the page loads
	;
}

function toggleCheckbox (ob) { // should toggle the checkbox of the active li
	var checkbox = ob.parentElement
	.firstElementChild.getElementsByTagName('input')[0];
	checkbox.checked = !checkbox.checked;
}

function textboxKeydownSwitch (event) { // handles textbox keydowns
	if (!event.altKey) {
		switch (event.keyCode){
			case 13: // enter key
				if (this.value.trim() != '') {
					addLiNext();
				};
				break;
			case 40: // down arrow key
				if (this.parentElement
					.parentElement.parentElement.lastElementChild != this
					.parentElement.parentElement) {
					this.parentElement
					.parentElement.nextElementSibling
					.getElementsByTagName('input')[1].focus();
				};
				break;
			case 38: // up arrow key
				if (this.parentElement.parentElement
					.parentElement.firstElementChild != this
					.parentElement.parentElement) {
					this.parentElement
					.parentElement.previousElementSibling
					.getElementsByTagName('input')[1].focus();
					setTimeout(function () {
						var value = document.activeElement.value;
						document.activeElement.value = '';
						document.activeElement.value = value;
					}, 5)
				};
				break;
		default:
			break;
		}
	} else if (event.altKey) {
		switch (event.keyCode){
			case 40: // down arrow key
				// move the entire li down
				moveLiDown(this);
				break;
			case 38: // up arrow key
				// move the entire li up
				moveLiUp(this);
				break;
			case 190: // period key
				toggleCheckbox(this);
				break;
			default:
				break;
		};
	};
}

function windowKeydownSwitch (event) { // handles all window keydowns
	if (!event.altKey) {
		switch (event.keyCode) {
			case undefined:
				break;
		}
	} else if (event.altKey) {
		switch (event.keyCode){
			case 76: // the 'l' key
				emptyLiCleaner();
				break;
			default:
				break;
		}
	};
}

/*
######################
"Global" Variables
######################
*/

var cubeKeeper = '';