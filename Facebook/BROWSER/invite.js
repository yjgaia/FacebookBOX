Facebook.invite = METHOD({

	run : function(params) {'use strict';
		//REQUIRED: params
		//REQUIRED: params.message
		//OPTIONAL: params.display

		var
		// message
		message = params.message,

		// display
		display = params.display;

		FB.ui({
			method : 'apprequests',
			message : message,
			display : display
		}, function(response) {
		});
	}
});

