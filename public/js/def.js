function addLiNext (textValue, checked, id) {
	var newLi = createLi(),
	pastLi = document.activeElement.parentElement
	.parentElement;
	pastLi.insertAdjacentElement('afterend',newLi);
	pastLi.nextElementSibling
	.getElementsByTagName('input')[1].focus()
}

function addLiLast (textValue, checked, id) {
	var newLi = createLi(textValue, checked, id);
	document.getElementById('list')
	.firstElementChild.appendChild(newLi);
}

function createLi (textValue, checked, id) {
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

function deleteTask () {
	var currentLi = document
	.activeElement.parentElement.parentElement;
	if (currentLi.parentElement.childElementCount > 1) {
		setTimeout(function() {
			currentLi.remove();
		}, 50)
	} else if (document.activeElement
		.previousElementSibling !== ''
		&& currentLi.parentElement.childElementCount === 1) {
			document.activeElement
		.previousElementSibling.value = '';
	};
}

function showLoader () {
	var coverDiv = document.getElementById('coverDiv');
	coverDiv.appendChild(cubeKeeper);
	coverDiv.style.visibility = 'visible';
}
function hideLoader () {
	document.getElementById('coverDiv')
	.style.visibility = 'hidden'
	document.getElementsByClassName('cube')[0].remove();
}

var cubeKeeper = '';
setTimeout(function() {
	cubeKeeper =  document.getElementsByClassName('cube')[0];
	setTimeout(function() {
		hideLoader();
	}, 10)
}, 50);