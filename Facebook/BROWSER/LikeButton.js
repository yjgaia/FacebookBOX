Facebook.LikeButton = CLASS({

	preset : function() {'use strict';
		return IFRAME;
	},

	init : function(inner, self, params) {'use strict';
		//REQUIRED: params
		//REQUIRED: params.href
		//OPTIONAL: params.layout
		//OPTIONAL: params.action
		//OPTIONAL: params.isShowSendButton
		//OPTIONAL: params.isShowFaces
		//OPTIONAL: params.colorscheme
		//OPTIONAL: params.width

		var
		// href
		href = params.href,

		// layout
		layout = params.layout === undefined ? 'standard' : params.layout,

		// action
		action = params.action === undefined ? 'like' : params.action,

		// is show share button
		isShowShareButton = params.isShowShareButton === undefined ? true : params.isShowShareButton,

		// is show faces
		isShowFaces = params.isShowFaces === undefined ? true : params.isShowFaces,

		// colorscheme
		colorscheme = params.colorscheme === undefined ? 'dark' : params.colorscheme,

		// width
		width = params.width,

		// height
		height,

		// el
		el = self.getEl();

		if (layout === 'standard') {
			// displays social text to the right of the button and friends' profile photos below.
			// Minimum width: 225 pixels. Minimum increases by 40px if action is 'recommend' by and increases by 60px if send is 'true'.
			// Default width: 450 pixels. Height: 35 pixels (without photos) or 80 pixels (with photos).

			if (width === undefined) {
				width = 450;
			}

			height = 35;

			if (isShowFaces === true) {
				height = 80;
			}
		}

		if (layout === 'button_count') {
			// displays the total number of likes to the right of the button.
			// Minimum width: 90 pixels.
			// Default width: 90 pixels. Height: 20 pixels.

			if (width === undefined) {
				width = 160;
			}

			height = 20;
		}

		if (layout === 'box_count') {
			// displays the total number of likes above the button.
			// Minimum width: 65 pixels.
			// Default width: 65 pixels. Height: 65 pixels.

			if (width === undefined) {
				width = 65;
			}

			height = 86;
		}

		self.setSrc('https://www.facebook.com/plugins/like.php?href=' + encodeURIComponent(href) + '&width=' + width + '&height=' + height + '&colorscheme=' + colorscheme + '&layout=' + layout + '&action=' + action + '&show_faces=' + isShowFaces + '&share=' + isShowShareButton + '&appId=' + CONFIG.Facebook.appId);

		self.addStyle({
			width : width,
			height : height
		});
	}
});
