/**
 * @author florian haftman
 */
Ext.regController('options', {
	
	_view				: null,
	_store				: null,
	_panelOtherNumber	: null,
	_isOtherNumberSet	: false,
	
	load : function(routeData) {
		
		this._view = routeData.view;
		
		this._loadData();
	},
    showPanelOtherNumber : function() {
        if (this._panelOtherNumber == null) {
			
			this._panelOtherNumber = Ext.create({
				xtype	: 'options_panel_other_number'
			});
		}
		
		this._panelOtherNumber.show();
	},
	hidePanelOtherNumber : function() {
		
		if (!this._isOtherNumberSet) {
			
			var selectField	= this._view.items.items[0].items.items[0];
			
			selectField.setValue(0);
		}
		
		this._isOtherNumberSet = false;
		
		this._panelOtherNumber.hide();
	},
	savePanelOtherNumber : function(routeData) {
		
		var selectField	= this._view.items.items[0].items.items[0];
		var otherText	= 'Other (' + routeData.number + ')';
		var options 	= [
			{ text : otherText, value : routeData.number}
		];
		
		selectField.setOptions(options, true);
		selectField.setValue(4);
		
		this._isOtherNumberSet = true;
		
		this.hidePanelOtherNumber();
	},
	_loadData : function() {
		
		var config = MSPhone.config.Settings.optionStore.remote;
		
		this._store = new MSPhone.stores.Online(config);
		
		this._store.load({
			scope		: this,
			callback	: this._callback
		});
	},
	_callback : function(records, operation, success) {
		
		if (success) {
			
			var selectField		= this._view.items.items[0].items.items[0];
			
			selectField.store 	= this._store.getAt(0).callback_numbersStore;
			selectField.setValue(0);
			
			this._view.loadRecord(this._store.getAt(0));
		} else {
			
			// show error
		}
	}
});