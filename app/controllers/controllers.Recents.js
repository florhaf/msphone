Ext.regController('recents', Ext.apply(MSPhone.controllers.AbstractEditableList, {
	
	// PROPERTIES
	_view				: null,
	_list				: null,
	_store 				: null,

	// PUBLIC
	load			: function(routeData) {
		
		this._view = routeData.view;
		
		this._loadData();
	},
	saveLastCall 	: function(routeData) {
		
		var now 	= this._getDateFormatted();
		var nowSort = this._getDateSorting();
		
		var contact = routeData.contact;
		var recent	= this._store.findRecord('id_contact', contact.id, 0, false, false, true);
		
		if (Ext.isEmpty(recent)) {
			
			recent = this._store.findRecord('number', contact.mobile_number, 0, false, false, true);
			
			if (Ext.isEmpty(recent)) {
				
				recent = Ext.ModelMgr.create({
					id_contact 		: contact.id_contact,
					dateFormatted	: now,
					dateSorting		: nowSort,
					numberFormatted	: contact.mobile_formatted_number,
					number			: contact.mobile_number,
					times_called	: 1,
					first_name		: contact.first_name,
					last_name		: contact.last_name
				}, 'recent');
				
				this._store.add(recent);
			} else {
				
				recent.set('times_called', 	recent.data.times_called + 1);
				recent.set('dateFormatted', now);
				recent.set('dateSorting', 	nowSort);
			}
		} else {
			
			recent.set('times_called',	recent.data.times_called + 1);
			recent.set('dateFormatted', now);
			recent.set('dateSorting', 	nowSort);
		}

		this._store.sort('dateSorting', 'DESC');
		this._store.sync();
	},

	// TAP HANDLERS
	details_onTap 	: function(routeData) {
		
		var recent = routeData.recent;

        var toolbar = Ext.create({
			xtype 		: 'details_toolbar',
			title 		: '',
			controller 	: 'recents'
		});
		
		var details = Ext.create({
			xtype	: 'details_recent',
			recent	: recent
		});
		
		this._view.setActiveItem(details, 'slide');
		this._view.removeDocked(this._view.getDockedComponent(0));
		this._view.addDocked(toolbar);
	},
	back_onTap 		: function() {

		var toolbar = Ext.create({
			xtype	: 'recents_toolbar'
		});

		this._view.setActiveItem(this._list, {
			type		: 'slide',
			direction	: 'right'
		});

		this._view.removeDocked(this._view.getDockedComponent(0));
		this._view.addDocked(toolbar);
	},
	
	// DATA HANDLERS
	_loadData 		: function() {

		var config = MSPhone.config.Settings.recentStore.local;

		this._store = new MSPhone.stores.Offline(config);

		this._store.load({
			scope 		: this,
			callback 	: this._callback
		});
	},
	_callback 		: function(records, operation, success) {

		if(success) {

			this._store.sort('dateSorting', 'DESC');

			this._list = Ext.create({
				xtype : 'recents_list',
				store : this._store
			});

			this._view.add(this._list);
		} else {

			// show error
		}
	},

	// HELPERS
	_format					: function(nb) {

		var str = nb + '';

		if (str) {
			
			return (str.length == 1) ? '0' + str : str;
		}
	},
	_getDateFormatted		: function() {
		
		var date	= new Date();
		var dateStr = date.toString('MM-dd-yyyy h:m');
		
		return dateStr.substring(0, dateStr.indexOf('GMT'));
	},
	_getDateSorting			: function() {
		
		var date	= new Date();
		var year 	= date.getFullYear();
		var month 	= this._format(date.getMonth());
		var day 	= this._format(date.getDate());
		var hours 	= this._format(date.getHours());
		var mins 	= this._format(date.getMinutes());
		var secs 	= this._format(date.getSeconds());
		
		return year + '-' + month + '-' + day + ' ' + hours + ':' + mins + ':' + secs;
	}
}));