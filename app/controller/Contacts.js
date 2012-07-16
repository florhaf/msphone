Ext.define('MSPhone.controller.Contacts', {
    extend: 'Ext.app.Controller',

    requires : ['MSPhone.view.contacts.Details'],
    
    config : {
        refs    : {
        	view		: 'contacts',
            personal	: 'contacts_personal',
            directory	: 'contacts_directory',
            crm			: 'contacts_crm',
            details		: 'contacts_details'
        },
        control : {
        	directory : {
        		show_details : 'show_details'
        	},
        	view : {
        		back : 'back'
        	}
        }
    },
    
    _crtActiveItem : null,

    init : function() {
    	
    	this.getApplication().on('contacts_directory_search', this.searchLdap, this);
        this.getApplication().on('contacts_crm_search', this.searchCrm, this);
    },
    
    show_details : function(record) {
    	
    	var details = Ext.create('MSPhone.view.contacts.Details', {
    		data : record.data
    	});
    	
    	this.getView().items.items[0].items.items[0].hide();
    	this.getView().items.items[0].items.items[1].show();
    	
    	this._crtActiveItem = this.getView().getActiveItem();
    	
    	this.getView().setActiveItem(details);
    	this.getView().items.items[0].setTitle('Details');
    },
    
    back : function() {
    	
    	this.getView().setActiveItem(this._crtActiveItem);
    	this.getView().items.items[0].setTitle('');
    	this.getView().items.items[0].items.items[1].hide();
    	
    	var me = this;
    	
    	setTimeout(function() {
    	
    		me.getView().items.items[0].items.items[0].show();
    	}, 300);
    },
    
	searchLdap			: function(options) {

		if (Ext.isEmpty(options.searchValue)) {
			
			return;
		}
		
		this._searchValue = options.searchValue;
						
		if ((options.searchValue.length == 3 && !options.isDelKey) ||
			(options.searchValue.length >= 3 && options.isEnterKey)) {
			
			this._ldapLookUp(options.searchValue);
		} else {
			
			if (options.searchValue.length > 3) {
				
				this._filter(options.searchValue);
			}
		}
	},
	
	// PRIVATE
	_ldapLookUp		: function(searchValue) {
		
		this.getDirectory().setMasked({
			xtype : 'loadmask',
			message : 'Loading..'
		});
			
		this._reqLdap = Ext.Ajax.request({
			url			: '/mobile/msphoneios/webapp/service/rest/ldaplookup',
			method		: 'POST',
			scope		: this,
			callback	: this._onLdapLookUpLoad,
			params		: {
				query	: searchValue
			}
		});
	},
	_onLdapLookUpLoad : function(options, success, response) {
		
		this.getDirectory().setMasked(false);
		
		var error;
		
		if (success) {
			
			// server responded
			
			if (!Ext.isEmpty(response) && !Ext.isEmpty(response.responseText)) {
				
				var oResponse = Ext.decode(response.responseText);
				
				if (oResponse.success) {
					
					if (this.getDirectory().getStore() == null) {
					
						this.getDirectory().setStore(Ext.create('Ext.data.Store', {
							model	: 'MSPhone.model.Contact',
							data	: oResponse.results
						}));
					} else {
						
						this.getDirectory().getStore().setData(oResponse.results);
					}
					
					this.getDirectory().refresh();
					
					this._filter(this._searchValue);
					
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
	_filter 			: function(searchValue) {
		
		var store = this.getDirectory().getStore();
		
		if (store == null) {
			
			return;
		}
		
		var tempFilter = {
	        property : 'name',
	        value    : searchValue,
	        anyMatch : true
	    };
	
	    store.clearFilter();
	    store.filter(tempFilter);
	
	    if (0 < store.getCount()) {
	
	        this._searchFilter = tempFilter;
	    } else {
	
	        if (this._searchFilter != null) {
	
	            store.clearFilter();
	            store.filter(this._searchFilter);
	        } else {
	
	            store.clearFilter();
	        }
	    }
	},

    searchCrm			: function(options) {

		if (Ext.isEmpty(options.searchValue)) {

			return;
		}

		this._searchValue = options.searchValue;

		if ((options.searchValue.length == 3 && !options.isDelKey) ||
			(options.searchValue.length >= 3 && options.isEnterKey)) {

			this._crmLookUp(options.searchValue);
		} else {

			if (options.searchValue.length > 3) {

				this._filterCrm(options.searchValue);
			}
		}
	},

	// PRIVATE
	_crmLookUp		: function(searchValue) {

		this.getCrm().setMasked({
			xtype : 'loadmask',
			message : 'Loading..'
		});

		this._reqLdap = Ext.Ajax.request({
			url			: '/mobile/msphoneios/webapp/service/rest/crmlookup',
			method		: 'POST',
			scope		: this,
			callback	: this._onCrmLookUpLoad,
			params		: {
				query	: searchValue
			}
		});
	},
	_onCrmLookUpLoad : function(options, success, response) {

		this.getCrm().setMasked(false);

		var error;

		if (success) {

			// server responded

			if (!Ext.isEmpty(response) && !Ext.isEmpty(response.responseText)) {

				var oResponse = Ext.decode(response.responseText);

				if (oResponse.success) {

					if (this.getCrm().getStore() == null) {

						this.getCrm().setStore(Ext.create('Ext.data.Store', {
							model	: 'MSPhone.model.Contact',
							data	: oResponse.results
						}));
					} else {

						this.getCrm().getStore().setData(oResponse.results);
					}

					this.getCrm().refresh();

					this._filter(this._searchValue);

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
	_filterCrm 			: function(searchValue) {

		var store = this.getCrm().getStore();

		if (store == null) {

			return;
		}

		var tempFilter = {
	        property : 'name',
	        value    : searchValue,
	        anyMatch : true
	    };

	    store.clearFilter();
	    store.filter(tempFilter);

	    if (0 < store.getCount()) {

	        this._searchFilter = tempFilter;
	    } else {

	        if (this._searchFilter != null) {

	            store.clearFilter();
	            store.filter(this._searchFilter);
	        } else {

	            store.clearFilter();
	        }
	    }
	}

});