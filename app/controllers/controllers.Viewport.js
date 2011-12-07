Ext.regController('viewport', {

	_view 			: null,
	_viewRecents 	: null,
	_viewContacts 	: null,
	_viewIconf		: null,
	_viewKeypad 	: null,
	_viewOptions 	: null,
	_defaultLoadMaskMessage : 'Please wait...',
	_loadMask : new Ext.LoadMask(Ext.getBody(), {	
		msg : "Please wait..."
	}),
		
	load : function(routeData) {
		
		this._view = routeData.view;
		
		//this._view.setActiveItem(1);

		// this._viewRecents	= this._view.getComponent(0);
		// this._viewContacts 	= this._view.getComponent(1);
		// this._viewIconf 	= this._view.getComponent(2);
		// this._viewKeypad 	= this._view.getComponent(3);
		// this._viewOptions 	= this._view.getComponent(4);
	},
	showLoadMask : function(message) {
		
		this._loadMask.show({
			message : (message) ? message : this._defaultLoadMaskMessage
		});
	},
	hideLoadMask : function() {
		
		this._loadMask.hide();
	},
	showError : function(errorCode) {

        //noinspection
        var shouldRetry = false;
		var needsLogin = false;

		switch (errorCode) {
			case 200:
			//Success (but with content as HTML for login or error) -- we'll assume login for now
			case 401:
			//Unauthorized
			case 407:
				//Proxy authentication required
				needsLogin = true;
				break;
			case 302:
			//Normal redirect (shouldn't error)
			case 307:
			//Temporary redirect (shouldn't error)
			case 408:
			//timeout
			case 500:
			//server error: Internal
			case 501:
			//server error: Not Implemented
			case 502:
			//server error: Bad Gateway
			case 503:
			//server error: Service Unavailable
			case 504:
			//server error: Gateway Timeout
			case 505:
				//server error: HTTP version Not Supported
				shouldRetry = true;
				break;
			case 400:
			//Bad request
			case 403:
			//Forbidden
			case 404:
			//Not found
			case 405:
			//Method not allowed
			case 406:
			//Not acceptible
			case 409:
			//Response conflict
			case 410:
			//Gone
			case 411:
			//Content length undefined
			case 412:
			//Precondition failed
			default:
				//takes care of null, etc...
				break;
		}

		if(needsLogin) {
			
			//TODO: send the user to the login page
		}

		if(shouldRetry) {
			
			//Recoverable Error -- network timeout 408, server (500+) errors
			Ext.Msg.confirm('Issue', 'An error occured while trying to load the page.', Ext.emptyFn);
		} else {
			
			//Unrecoverable Error -- data errors, 404 not found,  400 bad request, 403 forbidden, 405 method not allowed, 406 not acceptible, 409 response conflict, 410 gone, 411 content length undefined, 412 precondition failed, null (from our try/catch) = computational failure
			Ext.Msg.alert('Error', 'Sorry, the data you requested is not available.', Ext.emptyFn);
		}

		console.error("Error code: " + errorCode);
	}
});
