Ext.define('MSPhone.controller.Keypad', {
	extend	: 'Ext.app.Controller',
	
	config : {
		refs : {
			view : 'keypad'
		},
		control : {
			keypad : {
				key_up	: 'keyUp',
				del		: 'del',
				call	: 'call'
			}
		}
	},
	
	crtNumber : {
		formatted	: '',
		plain		: ''
	},
	
	keyUp : function(value) {

		this.crtNumber.plain += value;
		this.crtNumber.formatted = this._formatNumber(this.crtNumber.plain);
		
		this.getView().items.items[0].setHtml('<div style="padding-top: 15px;">' + this.crtNumber.formatted + '</div>');
	},
	del : function() {
		
		this.crtNumber.plain = this.crtNumber.plain.substr(0, this.crtNumber.plain.length - 1);
		this.crtNumber.formatted = this._formatNumber(this.crtNumber.plain);
		
		this.getView().items.items[0].setHtml('<div style="padding-top: 15px;">' + this.crtNumber.formatted + '</div>');
	},
	call : function() {
		
		this.getApplication().fireEvent('call', this.crtNumber.plain);
		
		this.getView().setMasked({
			xtype	: 'loadmask',
			message	: 'Calling...'
		});

        // force US numbers
//        if (this.crtNumber.plain.substr(0, 2) != '+1') {
//
//            this.crtNumber.plain = '+1' + this.crtNumber.plain
//        }

		Ext.Ajax.request({
			url			: '/mobile/msphoneios/webapp/service/rest/makecall/' + this.crtNumber.plain,
			method		: 'GET',
			scope		: this,
			callback	: this.onCallLoad
		});
	},
	onCallLoad : function(options, success, response) {
		
		if (success) {
			
			var me = this;
			
			setTimeout(function() {
				
				me.getView().setMasked(false);
			}, 2000);
			
		} else {
			
			this.getView().setMasked(false);
			
			if (!Ext.isEmpty(response) && !Ext.isEmpty(response.responseText)) {
				
				var oResponse = Ext.decode(response.responseText);
				
				Ext.Msg.alert('Error', oResponse.results[0]);
				
			} else {
				
				Ext.Msg.alert('Error', 'Server is not responding');
			}
		}
	},
	_formatNumber 		: function(number) {

		var regexObj = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;
		
		if(regexObj.test(number)) {
			
			var parts = number.match(regexObj);
			var phone = "";
			
			if(parts[1]) {
				
				phone += "+1 (" + parts[1] + ") ";
			}
			
			phone += parts[2] + "-" + parts[3];
			
			return phone;
		} else {
			
			return number;
		}
	}
});