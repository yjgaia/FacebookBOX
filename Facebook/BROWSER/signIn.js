Facebook.signIn = METHOD(function(m) {'use strict';

	var
	// is signed
	isSigned;

	return {

		run : function(scope, _callbacks) {'use strict';
			//OPTIONAL: scope
			//OPTIONAL: _callbacks
			//REQUIRED: _callbacks.signed
			//OPTIONAL: _callbacks.unsigned

			var
			// callbacks
			callbacks = _callbacks === undefined ? scope : _callbacks,

			// signed.
			signed = function(response) {

				isSigned = true;

				callbacks.signed(response);
			},

			// unsigned.
			unsigned = function() {

				isSigned = false;

				if (callbacks.unsigned !== undefined) {
					callbacks.unsigned();
				}
			};

			if (_callbacks === undefined) {
				scope = undefined;
			}

			FB.getLoginStatus(function(response) {
				// Here we specify what we do with the response anytime this event occurs.
				if (response.status === 'connected') {
					// The response object is returned with a status field that lets the app know the current
					// login status of the person. In this case, we're handling the situation where they
					// have logged in to the app.
					FB.api('/me', function(response) {
						signed(response);
					});
				} else if (response.status === 'not_authorized') {
					// In this case, the person is logged into Facebook, but not into the app, so we call
					// FB.login() to prompt them to do so.
					// In real-life usage, you wouldn't want to immediately prompt someone to login
					// like this, for two reasons:
					// (1) JavaScript created popup windows are blocked by most browsers unless they
					// result from direct interaction from people using the app (such as a mouse click)
					// (2) it is a bad experience to be continually prompted to login upon page load.
					FB.login(function(response) {
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
					}, {
						scope : scope
					});
				} else {
					// In this case, the person is not logged into Facebook, so we call the login()
					// function to prompt them to do so. Note that at this stage there is no indication
					// of whether they are logged into the app. If they aren't then they'll see the Login
					// dialog right after they log in to Facebook.
					// The same caveats as above apply to the FB.login() call here.
					FB.login(function(response) {
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
					}, {
						scope : scope
					});
				}
			});
		}
	};
});

