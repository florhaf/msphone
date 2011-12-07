Ext.regController('contacts',  Ext.apply(MSPhone.controllers.AbstractEditableList, {

	// PROPERTIES
	_view				: null,
	_subView			: null,
	_list				: null,
	_storeRemote		: null,
	_storeLocal			: null,
	_storeFWD			: null,
	_searchFilter		: null,
	_searchValue		: null,
    _currentViewIndex   : null,

	// PUBLIC
	load 			: function(routeData) {

        this._currentViewIndex = 0;

		this._view = routeData.view;

		this._loadDataLocal();
	},
	hideSearchBar 	: function(routeData) {
		
		var panel = routeData.panel;
		
		panel.scroller.setOffset({
			x : 0,
			y : -47
		}, true);
	},
	search			: function(routeData) {
		
		this._searchValue 	= routeData.searchValue;
		var isEnterKey		= routeData.isEnterKey;

		if (this._searchValue.length > 3 && !isEnterKey) {
			
			this._filterFWD();
		} else {
			
			if ((this._searchValue.length == 3) ||
				(this._searchValue.length > 3 && isEnterKey)) {
				
				this._loadDataFWD();
			} else {
				
				this._list.bindStore(this._storeLocal);
				this._view.dockedItems.items[0].items.items[0].setDisabled(false);
				this._view.dockedItems.items[0].items.items[2].setDisabled(false);
			}
		}
	},
	getContact		: function(id_contact) {
		
		return this._storeLocal.findRecord('id_contact', id_contact, 0, false, false, true);
	},
	addContact		: function(contact) {
		
		this._storeLocal.add(contact);
		this._storeLocal.sync();
		
		this._syncStoreRemote();
	},

	// DATA HANDLERS
	_loadDataRemote	: function() {
		
		var config = MSPhone.config.Settings.contactStore.remote.exchange;
		
		this._storeRemote = new MSPhone.stores.Online(config);
		
		this._storeRemote.load({
			scope		: this,
			callback	: this._callbackRemote
		});
	},
	_loadDataLocal	: function() {
		
		var config = MSPhone.config.Settings.contactStore.local;
		
		this._storeLocal = new MSPhone.stores.Offline(config);
		
		this._storeLocal.load({
			scope		: this,
			callback	: this._callbackLocal
		});
	},
	_loadDataFWD	: function() {
		
		var config = MSPhone.config.Settings.contactStore.remote.directory;
		
		this._storeFWD = new MSPhone.stores.Online(config);
		
		this._storeFWD.load({
			scope		: this,
			callback	: this._callbackFWD
		});
	},
	_callbackRemote	: function(records, operation, success) {
		
		if (success) {
			
			if (this._storeLocal == null) {
				
				var config = {
					model	: 'contact',
					id		: 'contacts',
					sorters	: 'last_name',
					getGroupString : function(record) {
						
				        return record.get('last_name')[0];
				    }
				};
				
				this._storeLocal = new MSPhone.stores.Offline(config);
			} else {

                this._storeLocal.removeAll();
                this._storeLocal.getProxy().clear();
            }
			
			var me = this;
			
			// sync remote store with local store
			this._storeRemote.each(function() {
				
				me._storeLocal.add(this.data);
			});
			this._storeLocal.sync();
			
			if (this._list == null) {

				this._list = Ext.create({
					xtype			: 'contacts_list',
					store			: this._storeLocal
				});
				
				this._view.items.items[0].items.items.push(this._list);
			}
		} else {
			
			// show error
		}
	},
	_callbackLocal	: function(records, operation, success) {
		
		if (success) {
			
			if (this._storeLocal.getCount() == 0) {
				
				this._loadDataRemote();
				return;
			}
			
			this._list = Ext.create({
				xtype			: 'contacts_list',
				store			: this._storeLocal
			});
			
			// add list to the search panel
			this._view.items.items[0].items.items.push(this._list);
		} else {
			
			// show error
		}
	},
	_callbackFWD	: function(records, operation, success) {
		
		if (success) {
			
			this._list.bindStore(this._storeFWD);
			this._view.dockedItems.items[0].items.items[0].setDisabled(true);
			this._view.dockedItems.items[0].items.items[2].setDisabled(true);
		} else {
			
			// show error
		}
	},

	// TAP HANDLERS
	details_onTap	: function() {
				
		var toolbar = Ext.create({
			xtype 		: 'details_toolbar',
			title 		: '',
			controller 	: 'contacts'
		});

        this._currentViewIndex = 1;

		this._view.setActiveItem(this._currentViewIndex, 'slide');
		
		this._view.removeDocked(this._view.getDockedComponent(0));
		this._view.addDocked(toolbar);
	},
    editContact_onTap      : function() {

        this._currentViewIndex = 2;

        this._view.setActiveItem(this._currentViewIndex, 'slide');
    },
	back_onTap		: function() {

        this._currentViewIndex--;

        if (this._currentViewIndex == 0) {

            var toolbar = Ext.create({
                xtype	: 'contacts_toolbar'
            });

            this._view.removeDocked(this._view.getDockedComponent(0));
		    this._view.addDocked(toolbar);
        }

        this._view.setActiveItem(this._currentViewIndex, {
			type		: 'slide',
			direction	: 'right'
		});
	},
    sync_onTap      : function() {

        this._loadDataRemote();
    },

	// HELPERS
	_syncStoreRemote    : function() {
		
		// TODO sync remote store here
		console.info('contacts._syncStoreRemote not implemented');
	},
	_filterFWD 			: function() {
		
		var tempFilter = {
            property : 'last_name',
            value    : this._searchValue,
            anyMatch : true
        };

        this._storeFWD.clearFilter();
        this._storeFWD.filter(tempFilter);

        if (0 < this._storeFWD.getCount()) {

            this._searchFilter = tempFilter;
        } else {

            if (this._searchFilter != null) {

                this._storeFWD.clearFilter();
                this._storeFWD.filter(this._searchFilter);
            } else {

                this._storeFWD.clearFilter();
            }
        }
	}
}));