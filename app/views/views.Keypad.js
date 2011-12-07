MSPhone.views.Keypad = Ext.extend(Ext.Panel, {

	initComponent : function() {

		Ext.apply(this, {
			
			title 		: 'Keypad',
			iconCls 	: 'msPhoneKeypad',
			dockedItems	: [{
				xtype 		: 'keypad_panel_dial',
				dock		: 'top'
            },{
				xtype		: 'keypad_panel_action',
				dock		: 'bottom'
			}],
			items 		: [{
				xtype		: 'keypad_panel_number'
            }],
			listeners : {
		    	scope		: this,
		    	afterrender : function() {
		    		
    				Ext.dispatch({
						controller	: 'keypad',
						action		: 'load',
						view		: this
					});
		    	}
		    }
		});

		MSPhone.views.Keypad.superclass.initComponent.call(this);
	}
});

Ext.reg('keypad', MSPhone.views.Keypad);