Facebook.share = METHOD({

	run : function(params) {'use strict';
		//REQUIRED: params
		//REQUIRED: params.href
		//OPTIONAL: params.description
		//OPTIONAL: params.display

		var
		// href
		href = params.href,
		
		// description
		description = params.description,

		// display
		display = params.display;

		FB.ui({
			method : 'feed',
			description : description,
			display : display,
			link : href
		}, function(response) {
		});
	}
});

