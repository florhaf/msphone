Ext.define('MSPhone.view.contacts.Personal', {
	extend	: 'Ext.List',
	xtype	: 'contacts_personal',
	
	config : {
		grouped		: true,
		emptyText	: 'empty',
		items		: [{
			xtype	: 'toolbar',
            ui      : 'light',
            cls     : 'msToolbar',
			items	: [{
				xtype	: 'searchfield',
				width	: '95%',
				placeHolder : 'Search your contacts'
			}]
		},{
            html : 'not implemented yet'
        }],
		itemtpl : '<b>{surname}</b>, {givenname} ({bu})'
	}
});