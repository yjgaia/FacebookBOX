Facebook.checkSigned = METHOD({

	run : function(callbacks) {'use strict';
		//REQUIRED: callbacks
		//OPTIONAL: callbacks.signed
		//OPTIONAL: callbacks.unsigned

		var
		// signed.
		signed = function(response) {

			Facebook.signIn.isSigned = true;

			if (callbacks.signed !== undefined) {
				callbacks.signed(response);
			}
		},

		// unsigned.
		unsigned = function() {

			Facebook.signIn.isSigned = false;

			if (callbacks.unsigned !== undefined) {
				callbacks.unsigned();
			}
		};

		if (CONFIG.Facebook !== undefined) {

			FB.getLoginStatus(function(response) {
				// Here we specify what we do with the response anytime this event occurs.
				if (response.status === 'connected') {
					// The response object is returned with a status field that lets the app know the current
					// login status of the person. In this case, we're handling the situation where they
					// have logged in to the app.
					FB.api('/me', function(response) {

						FB.api({
							method : 'fql.query',
							query : 'SELECT uid, name FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me())'
						}, function(friendInfos) {

							response.friends = friendInfos;

							signed(response);
						});
					});
				} else {
					unsigned();
				}
			});
		}
	}
});
