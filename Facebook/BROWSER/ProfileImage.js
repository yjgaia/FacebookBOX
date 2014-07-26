Facebook.ProfileImg = CLASS({

	preset : function() {'use strict';
		return IMG;
	},

	init : function(inner, self, params) {'use strict';
		//REQUIRED: params
		//REQUIRED: params.id
		//OPTIONAL: params.type

		var
		// id
		id = params.id,

		// type (large, small, square)
		type = params.type;

		self.setSrc('http://graph.facebook.com/' + id + '/picture' + (type === undefined ? '' : '?type=' + type));
	}
});
