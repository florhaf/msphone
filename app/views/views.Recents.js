MSPhone.views.Recents = Ext.extend(Ext.Panel, {
	
	initComponent : function() {
		
		Ext.apply(this, {
			
		   title	: 'Recents',
		   iconCls	: 'msPhoneRecents',
		   layout 	: {
		   		type : 'card'
		   },
		   dockedItems: [{
		        xtype	: 'recents_toolbar'
		    }],
		    listeners : {
		    	scope		: this,
		    	afterrender : function() {
		    		
    				Ext.dispatch({
						controller	: 'recents',
						action		: 'load',
						view		: this
					});
		    	},
		    	hide		: function() {
		    		
		    		Ext.dispatch({
		    			controller	: 'recents',
		    			action		: 'reset'
		    		});
		    	}
		    }
		});
		
		MSPhone.views.Recents.superclass.initComponent.call(this);
	}
	
});

Ext.reg('recents', MSPhone.views.Recents);
