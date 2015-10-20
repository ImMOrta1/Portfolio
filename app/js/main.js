// всплывающий popap
$(document).ready(function(){

	$('.add-project-link').on('click', function(e) {
		e.preventDefault();

		$('.form_input-fake').trigger('reset');

		$('.popup').bPopup({
			positionStyle: 'fixed',
			closeClass : 'popup-close',

			onClose: function(form) {
        		var form = $(this);
				form.find('.popup-input-text, .popup-textarea, .popup-upload-fake').trigger('qtipHidden');
				form.find('.red-border').removeClass('red-border');
				form.find('.popup-form').trigger('reset');
				form.find('.popup-upload-fake').text('Загрузите изображение');
        	}
		});
	});

	$('.popup-input-file-upload').on('change', function(){

		var
			$this = $(this),
			value = $this.val(),
			pureVal = value.replace(/c:\\fakepath\\/gmi, "");

		$('.popup-upload-fake').text(pureVal);

		$('.popup-form').find('.popup-upload-fake').trigger('qtipHidden');
		$('.popup-upload-fake').removeClass('red-border');
	});

	if(!Modernizr.input.placeholder){
		$('input, textarea').placeholder();
	}

});

// валидация форм

var validation = (function () {

	var init = function () {
		_setUpListners();
	};

	var formValidation = function (form) {
		var elements = form.find('input, textarea, .popup-input-file-upload').not('.checkbox-real');

		$.each(elements, function (index, val){
			var element = $(val),
				 val = element.val(),
				 pos = element.attr('qtip-position');

			if(val.length === 0){
				element.addClass('red-border');

				if (element.hasClass('popup-input-file-upload')) {
					element = $(this).closest('.popup-input-file').find('.popup-upload-fake');
					element.addClass('red-border');
				}

				_createQtip(element, pos);
				valid = false;
			}
		});

		return valid;
	};



	var _setUpListners = function () {

		$('form').on('submit', function(event) {
			event.preventDefault();
			var form = $(this),
			 	 defence = _submitForm(form);
		});

		$('form').on('keydown', '.red-border', function() {
			$(this).removeClass('red-border');
		});

		$('form').on('reset', function(form) {
			var form = $(this);
			form.find('.contacts-form-name, .contacts-form-email, .contacts-form-textarea, .contacts-form-capcha').trigger('qtipHidden');
			form.find('.red-border').removeClass('red-border');
		});
	};

	var _submitForm = function (form) {
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
				at: 'left center',
				adjust: {
					method: 'shift none'
				}
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
				event: 'keydown qtipHidden'
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