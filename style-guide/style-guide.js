function onReady() {
	var links = document.querySelectorAll('#item-list a'),
		checkbox = document.querySelector('.homdna-checkbox'),
		checkboxDiv = document.querySelector('.homdna-checkbox div'),
		checkboxSpan = document.querySelector('.homdna-checkbox span'),
		checked = true,
		classes = [
			'',
			'checked',
			'sg-icon-checkbox'
		],
		footerTabItems = document.querySelectorAll('.footer .tab-item');

	function toggleCheckbox() {
		checked = !checked;

		if (checked) {
			checkboxDiv.className = classes[1];
			checkboxSpan.className = classes[2];
		}
		else {
			checkboxDiv.className = classes[0];
			checkboxSpan.className = classes[0];
		}
	}

	function linkClicked() {
		document.querySelector('#item-list a li.active').className = '';
		this.firstElementChild.className = 'active';
	}

	function tabItemClicked() {
		var activeTab = document.querySelector('.footer .tab-item.active');

		activeTab.className = _.without(activeTab.className.split(' '), 'active').join(' ');
		this.className = _.union(this.className.split(' '), ['active']).join(' ');
	}

	for (var i=0; i<links.length; i++) {
	  links[i].addEventListener('click', linkClicked);
	}

	for (var j=0; j<footerTabItems.length; j++) {
	  footerTabItems[j].addEventListener('click', tabItemClicked);
	}

	checkbox.addEventListener('click', toggleCheckbox);
}

document.addEventListener('DOMContentLoaded', onReady);