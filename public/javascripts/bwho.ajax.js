function setupForm(url, form, button, response, buttonText, successText) {
	$(form).submit(function(evt) {
		evt.preventDefault();
		if (!$(form).valid())
			return;
		addSpinner(button, buttonText);
		$.ajax({
			type: 'POST',
			data: $(this).serialize(),
			contentType: 'application/x-www-form-urlencoded',
			url: url,
			success: function(data) {
				clearSpinner(button, buttonText);
				parseAndRespond(response, data, successText);
			},
			error: function() {
				clearSpinner(button, buttonText);
				$(response).html('<div class="alert alert-danger" role="alert"><p>Unknown Error</p></div>');
			}
		});
	});
}

function parseAndRespond(id, data, success) {
	data = JSON.parse(data);
	if (data.error)
		$(id).html('<div class="alert alert-danger" role="alert"><p>'+data.error+'</p></div>');
	else if (data.redirect)
		window.location.href = data.redirect;
	else
		$(id).html('<div class="alert alert-success" role="alert"><p>'+success+'</p></div>');
}

function addSpinner(id, text) {
	$(id).html('<i class="fa fa-spinner fa-pulse fa-fw" />&nbsp;'+text);
}

function clearSpinner(id, text) {
	$(id).html(text);
}