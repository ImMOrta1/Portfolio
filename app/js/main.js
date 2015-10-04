$(document).ready(function(){

	$('.add-project-link').on('click', function(e) {
		e.preventDefault();

		$('.popup').bPopup({
			closeClass : 'popup-close'
		});
	});

	$('.popup-input-file-upload').on('change', function(){

		var
			$this = $(this),
			value = $this.val(),
			pureVal = value.replace(/c:\\fakepath\\/gmi, "");

		$('.popup-upload-fake').text(pureVal);

	});
}); // - > ready_end;