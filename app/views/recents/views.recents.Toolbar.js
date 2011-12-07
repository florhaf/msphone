Ext.namespace('MSPhone.views.recents');

MSPhone.views.recents.Toolbar = Ext.extend(Ext.Toolbar, {
	
	initComponent : function() {
		
		Ext.apply(this, {
			
			title	: 'Recent Calls',
	        items	: [{
	        	xtype	: 'button',
	        	text	: 'Edit',
	        	listeners : {
	        		scope 	: this,
	        		tap 	: function() {
	        			
	        			Ext.dispatch({
	        				controller 	: 'recents',
	        				action		: 'edit_onTap'
	        			});
	        		}
	        	}
	        },{
	        	xtype	: 'spacer'
	        },{
	        	xtype	: 'button',
	        	text	: 'Clear',
	        	listeners : {
	        		scope 	: this,
	        		tap 	: function() {
	        			
	        			Ext.dispatch({
	        				controller 	: 'recents',
	        				action		: 'clear_onTap'
	        			});
	        		}
	        	}
	        }]
		});
		
		MSPhone.views.recents.Toolbar.superclass.initComponent.call(this);
	}
});

Ext.reg('recents_toolbar', MSPhone.views.recents.Toolbar);
