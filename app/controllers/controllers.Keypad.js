Ext.regController('keypad', {

	// PROPERTIES
	_view 					: null,
	_subView				: null,
	_store					: null,
	_waitingPanel 			: null,
	_currentNumber 			: null,
	_currentFormattedNumber : null,
	_key 					: null,
	_currentKeyType 		: null,
	_currentContact			: null,

	// PUBLIC
	load 				: function(routeData) {

		this._view = routeData.view;
		
		if (this._currentNumber == null) {
			
			this._currentNumber = '';
		}
	},
	loadRecentNumber	: function(routeData) {
		
		var recent 				= routeData.recent.data;
		var contactsController 	= Ext.ControllerManager.get('contacts');
		
		this._currentContact 	= contactsController.getContact(recent.id_contact);
		
		if (!Ext.isEmpty(this._currentContact)) {
			
			this._currentContact 	= this._currentContact.data;
			this._currentNumber 	= this._currentContact.mobile_number;
		} else {
			
			this._currentNumber 	= recent.number;
		}
		
		this._loadNumber();
	},
	loadContactNumber 	: function(routeData) {

		this._currentContact = routeData.contact.data;

		this._currentNumber = this._currentContact.mobile_number;
		
		this._loadNumber();
	},
	_loadNumber			: function() {
		
		if (!Ext.isEmpty(this._currentContact)				&&
			!Ext.isEmpty(this._currentContact.first_name) 	&&
			!Ext.isEmpty(this._currentContact.last_name)) {
			
			this._currentFormattedNumber = this._currentContact.last_name + ', ' + this._currentContact.first_name;
		} else {
			
			this._currentFormattedNumber = this._formatNumber(this._currentNumber);
		}
		
		this._view.dockedItems.items[0].items.items[0].update({ number: this._currentFormattedNumber });
		
		MSPhone.views.viewport.on('cardswitch', function(){ 
		    
		    // uncomment to dial automatically
		    // this._callKeyUp();
		    
		}, this, { single : true });
		
		MSPhone.views.viewport.setActiveItem(this._view);
	},
	keyUp 				: function(routeData) {

		this._key = routeData.key;
		this._currentKeyType = this._getCurrentKeyType(this._key);

		switch (this._currentKeyType) {

			case MSPhone.config.Settings.keyType.number :
			
				this._numberKeyUp(this._key);
				break;
			case MSPhone.config.Settings.keyType.call :
			
				this._callKeyUp(this._key);
				break;
			case MSPhone.config.Settings.keyType.add :
			
				this._addKeyUp(this._key);
				break;
			case MSPhone.config.Settings.keyType.del :
			
				this._delKeyUp(this._key);
				break;
			default:
			
				// error
				break;
		}
	},
	_addKeyUp			: function() {
		
		this._subView = this._view.items;
		
		var details = Ext.create({
			xtype	: 'details_contact'
		});
		
		this._view.setActiveItem(details, 'scale');
	},

	// KEY HELPERS
	_numberKeyUp 		: function(key) {
	
		if (this._currentContact != null) {
			
			this._currentContact = null;
		}

		this._currentNumber += key;
		this._currentFormattedNumber = this._formatNumber(this._currentNumber);
		
		this._view.dockedItems.items[0].items.items[0].update({ number: this._currentFormattedNumber });		
	},
	_delKeyUp 			: function() {

		this._currentNumber = this._currentNumber.substring(0, this._currentNumber.length - 1);
		this._currentFormattedNumber = this._formatNumber(this._currentNumber);
		
		this._view.dockedItems.items[0].items.items[0].update({ number: this._currentFormattedNumber });
	},
	_callKeyUp 			: function() {
		
		if (!Ext.isEmpty(this._currentNumber)) {
			
			if (this._currentContact == null) {
				
				var id = Math.floor(Math.random() * 1001);
			
				this._currentContact = Ext.ModelMgr.create({
					id						: id,
					id_contact				: id,
					last_name				: '',
					first_name				: '',
					mobile_number			: this._currentNumber,
					mobile_formatted_number : this._currentFormattedNumber
				}, 'contact').data;
			}
			
			this._sendRequest();
			
			Ext.dispatch({
				controller	: 'recents',
				action		: 'saveLastCall',
				contact		: this._currentContact
			});
			
			this._currentContact = null;
		}
	},
	
	// DATA HANDLERS
	_sendRequest 		: function() {
		
		this._showWaitingPanel();
		
		var config = MSPhone.config.Settings.keypadStore.remote;
		
		this._store = new MSPhone.stores.Online(config);
		
		this._store.load({
			scope		: this,
			callback	: this._callback
		});
	},
	_callback 			: function(records, operation, success) {

		if (success) {
			
			this._hideWaitingPanel();
		} else {
			
			// show error
		}
	},
	
	// LOADING PANEL
	_showWaitingPanel 	: function() {
		
		this._waitingPanel = new Ext.LoadMask(Ext.getBody(), {
			msg : "Please wait..."
		});
		
		this._waitingPanel.show();
	},
	_hideWaitingPanel 	: function() {
		
		this._waitingPanel.hide();
		this._waitingPanel = null;
	},
	
	// HELPERS
	_getCurrentKeyType 	: function(key) {

		var reg = new RegExp('^[0-9]+$');

		if(reg.test(key)) {

			return MSPhone.config.Settings.keyType.number;
		} else {
			
			return MSPhone.config.Settings.keyType[key];
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