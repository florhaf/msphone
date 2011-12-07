MSPhone.views.IConf = Ext.extend(Ext.Panel, {
	
	initComponent : function() {
		
		Ext.apply(this, {
			
		   title: 'iConf',
		   iconCls: 'msPhoneIconf',
		   layout : {
		   		type : 'card'
		   },
		   dockedItems: [{
		        xtype: 'toolbar',
		        title: 'iConf'
		    }],

		    listeners : {
		    	scope		: this,
		    	afterrender : function() {
		    		
    				// Ext.dispatch({
						// controller	: 'contacts',
						// action		: 'load',
						// view		: this
					// });
		    	}
		    }
		});
		
		MSPhone.views.IConf.superclass.initComponent.call(this);
	}
	
});

Ext.reg('iconf', MSPhone.views.IConf);