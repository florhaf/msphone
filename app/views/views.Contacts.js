MSPhone.views.Contacts = Ext.extend(Ext.Panel, {
	
	initComponent : function() {
		
		Ext.apply(this, {
			
		   title	: 'Contacts',
		   iconCls	: 'msPhoneContacts',
		   layout 	: {
		   		type    : 'card'
		   },
		   dockedItems: [{
		        xtype	: 'contacts_toolbar'
           }],
		    items	: [{
		    	xtype	: 'contacts_search'
		    },{
                xtype   : 'details_contact'
            },{
                xtype   : 'details_contact_edit'
            }],
		    listeners : {
		    	scope		: this,
		    	afterrender : function() {
		    		
    				Ext.dispatch({
						controller	: 'contacts',
						action		: 'load',
						view		: this
					});
		    	},
		    	hide		: function() {
		    		
		    		// Ext.dispatch({
		    			// controller	: 'contacts',
		    			// action		: 'reset'
		    		// });
		    	}
		    }
		});
		
		MSPhone.views.Contacts.superclass.initComponent.call(this);
	}
	
});

Ext.reg('contacts', MSPhone.views.Contacts);