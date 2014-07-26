Facebook.init = OBJECT({

	init : function() {'use strict';

		if (CONFIG.Facebook !== undefined) {

			FB.init({
				appId : CONFIG.Facebook.appId,
				channelUrl : '//' + CONFIG.Facebook.domain + '/Facebook/R/channel.html', // Channel File
				cookie : true // enable cookies to allow the server to access the session
			});
		}
	}
});
