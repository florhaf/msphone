Ext.namespace('MSPhone.views.contacts');

MSPhone.views.contacts.Toolbar = Ext.extend(Ext.Toolbar, {
	
	initComponent : function() {
		
		Ext.apply(this, {
			
			title	: 'Contacts',
	        items	: [{
	        	xtype	: 'button',
	        	text	: 'Edit',
	        	listeners : {
	        		scope 	: this,
	        		tap 	: function() {
	        			
	        			Ext.dispatch({
	        				controller 	: 'contacts',
	        				action		: 'edit_onTap'
	        			});
	        		}
	        	}
	        },{
	        	xtype	: 'spacer'
	        },{
	        	xtype	: 'button',
	        	text	: 'Sync',
	        	listeners : {
	        		scope 	: this,
	        		tap 	: function() {
	        			
	        			Ext.dispatch({
	        				controller 	: 'contacts',
	        				action		: 'sync_onTap'
	        			});
	        		}
	        	}
	        }]
		});
		
		MSPhone.views.contacts.Toolbar.superclass.initComponent.call(this);
	}
});

Ext.reg('contacts_toolbar', MSPhone.views.contacts.Toolbar);
