var validation = (function () {

	var init = function () {
		_setUpListners();
	};

	var formValidation = function (form) {
		var elements = form.find('input, textarea, .popup-upload-fake').not('input[type="file"], input[type="chechbox"]');

		$.each(elements, function (index, val){
			var element = $(val),
				 val = element.val(),
				 pos = element.attr('qtip-position');

			if(val.length ===0){
				_createQtip(element, pos)
				valid = false;
			}
		});
		return valid;
	};



	var _setUpListners = function () {
		$('form').on('submit', _formSubmmit);
		$('form').on('reset', _formReset);
	};

	var _formSubmmit = function(event){
		event.preventDefault();

		var form = $(this)
			 defence = _defenceForm(form);
	};

	var _defenceForm = function (form) {
		if (!formValidation(form)) return false;
	}

	var _createQtip = function (element, position) {

		if (position === 'right') {
			position = {
				my: 'left center',
				at: 'right center'
			}
		}else{
			position = {
				my: 'right center',
				at: 'left center'
			}
		}

		element.qtip({
			content: {
				text: function() {
					return $(this).attr('qtip-content');
				}
			},
			show: {
				event: 'showError'
			},
			hide: {
				event: 'keydown hideTooltip'
			},
			position: position,
			style: {
				classes: 'qtip-rounded'
			}
		}).trigger('showError');

	};


	return {
		init: init,
		formValidation: formValidation
	};

})();

validation.init();