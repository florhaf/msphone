Ext.define('MSPhone.controller.Options', {
	extend	: 'Ext.app.Controller',
	
	config : {
		refs : {
			view : 'options'
		},
		control : {
			view : {
				customPainted : 'painted',
				setEcs : 'setEcs',
				callHelpDesk : 'callHelpDesk',
				callVoiceMail : 'callVoiceMail',
				setCallbackNumber : 'setCallbackNumber'
			}
		}
	},
	
	_isDataLoaded : false,
		
	painted : function() {
		
		if (!this._isDataLoaded) {
			
			this.loadData();
		}
	},
	
	callVoiceMail : function(options) {
		
		this.getView().setMasked({
			xtype	: 'loadmask',
			message	: 'Calling voicemail...'
		});
		
		Ext.Ajax.request({
			url			: '/mobile/msphoneios/webapp/service/rest/callvoicemail',
			method		: 'POST',
			scope		: this,
			callback	: this.callback,
			params		: {
				pin : options.pin
			}
		});
	},
	callHelpDesk : function() {
		
		this.getView().setMasked({
			xtype	: 'loadmask',
			message	: 'Calling helpdesk...'
		});
		
		Ext.Ajax.request({
			url			: '/mobile/msphoneios/webapp/service/rest/callhelpdesk',
			method		: 'GET',
			scope		: this,
			callback	: this.callback
		});
	},
	callback : function(options, success, response) {
		
		this.getView().setMasked(false);
		
		var error;
		
		if (success) {
						
			// server responded
			
			if (!Ext.isEmpty(response) && !Ext.isEmpty(response.responseText)) {
				
				var oResponse = Ext.decode(response.responseText);
				
				if (oResponse.success) {
					
					var me = this;
					
					setTimeout(function() {
						
						me.getView().setMasked(false);
					}, 3000);
					
				} else {
					
					// server responded with failure
					// show error
					
					error = oResponse.results[0];
					Ext.Msg.alert('Error', error);
				}
			}
		} else {
			
			// server did not respond
			// show error
			
			error = "Server not responding";
			Ext.Msg.alert('Error', error);
		}
	},
	
	setEcs : function(options) {
		
		var action = options.action;
		var pin = options.pin;
		
		this.getView().setMasked({
			xtype	: 'loadmask',
			message	: 'Loading...'
		});
		
		Ext.Ajax.request({
			url			: '/mobile/msphoneios/webapp/service/rest/setecs',
			method		: 'POST',
			scope		: this,
			callback	: this.onSetEcsLoad,
			params		: {
				action : options.action,
				pin : options.pin
			}
		});
	},
	onSetEcsLoad : function(options, success, response) {
		
		this.getView().setMasked(false);
				
		var error;
		
		if (success) {
						
			// server responded
			
			if (!Ext.isEmpty(response) && !Ext.isEmpty(response.responseText)) {
				
				var oResponse = Ext.decode(response.responseText);
				
				if (oResponse.success) {
					
					var msg = (options.params.action == true) ? 'Call forwarding set' : 'Call forwarding removed'
					
					Ext.Msg.alert('ECS', msg);
					
				} else {
					
					// server responded with failure
					// show error
					
					error = oResponse.message;
					Ext.Msg.alert('Error', error);
				}
			}
		} else {
			
			// server did not respond
			// show error
			
			error = "Server not responding";
			Ext.Msg.alert('Error', error);
		}
	},
	
	setCallbackNumber : function(value) {
		
		this.getView().un('setCallbackNumber', this.setCallbackNumber, this);
		
		this.getView().setMasked({
			xtype	: 'loadmask',
			message	: 'Loading...'
		});
		
		Ext.Ajax.request({
			url			: '/mobile/msphoneios/webapp/service/rest/setcallback',
			method		: 'POST',
			scope		: this,
			callback	: this.onSetCallbackNumberLoad,
			params		: 'callback=' + value
		});
	},
	onSetCallbackNumberLoad : function(options, success, response) {
		
		this.getView().setMasked(false);
		
		var error;
		
		if (success) {
						
			// server responded
			
			if (!Ext.isEmpty(response) && !Ext.isEmpty(response.responseText)) {
				
				var oResponse = Ext.decode(response.responseText);
				
				if (oResponse.success) {
					
					this.loadData();
				} else {
					
					// server responded with failure
					// show error
					
					error = oResponse.results[0];
					Ext.Msg.alert('Error', error);
				}
			}
		} else {
			
			// server did not respond
			// show error
			
			error = "Server not responding";
			Ext.Msg.alert('Error', error);
		}
	},
	
	loadData : function() {
		
		this.getView().setMasked({
			xtype	: 'loadmask',
			message	: 'Loading...'
		});
		
		Ext.Ajax.request({
			url			: '/mobile/msphoneios/webapp/service/rest/getsettings',
			method		: 'GET',
			scope		: this,
			callback	: this.onDataLoad
		});
	},
	onDataLoad : function(options, success, response) {
		
		this.getView().setMasked(false);
		
		var error;
		
		if (success) {
			
			this._isDataLoaded = true;
			
			// server responded
			
			if (!Ext.isEmpty(response) && !Ext.isEmpty(response.responseText)) {
				
				var oResponse = Ext.decode(response.responseText);
				
				if (oResponse.success) {
					
					// server responded with success
					var iphoneNumber	= "+1 123 456-7890"; // need to get that from the device through the shell
					var numbers			= [oResponse.results[0].office_number, oResponse.results[0].mobile_number, iphoneNumber];
					var selectField		= this.getView().items.items[1].items.items[0];
			
					var options;
					
					var cbNumber = oResponse.results[0].callback;
					
					if (cbNumber[0] == ' ') {
						
						cbNumber = cbNumber.substr(1, cbNumber.length - 1);
					}
					
					cbNumber = '+' + cbNumber;
					
					if (cbNumber != numbers[0] &&
							cbNumber != numbers[1] &&
							cbNumber != numbers[2]) {
						options = [
		                    {text: 'Office (' + numbers[0] + ')', value: numbers[0]},
		                    {text: 'Mobile (' + numbers[1] + ')', value: numbers[1]},
		                    {text: 'iPhone (' + numbers[2] + ')', value: numbers[2]},
		                    {text: 'Other (' + cbNumber + ')', value: cbNumber}
						];
					} else {
						
						options = [
		                    {text: 'Office (' + numbers[0] + ')', value: numbers[0]},
		                    {text: 'Mobile (' + numbers[1] + ')', value: numbers[1]},
		                    {text: 'iPhone (' + numbers[2] + ')', value: numbers[2]}
						];
					}
					
					selectField.setOptions(options);
					
					selectField.setValue(cbNumber);
					
					this.getView().on('setCallbackNumber', this.setCallbackNumber, this);
					
				} else {
					
					// server responded with failure
					// show error
					
					error = oResponse.results[0];
					Ext.Msg.alert('Error', error);
				}
			}
		} else {
			
			// server did not respond
			// show error
			
			error = "Server not responding";
			Ext.Msg.alert('Error', error);
		}
	}
});