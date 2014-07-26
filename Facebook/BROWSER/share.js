Facebook.share = METHOD({

	run : function(params) {'use strict';
		//REQUIRED: params
		//REQUIRED: params.href
		//OPTIONAL: params.display

		var
		// href
		href = params.href,

		// display
		display = params.display;

		FB.ui({
			method : 'feed',
			display : display,
			link : href
		}, function(response) {
		});
	}
});

