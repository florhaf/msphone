Ext.namespace('MSPhone.views.options');

MSPhone.views.options.PanelOtherNumber = Ext.extend(Ext.Panel, {
	
	initComponent : function() {
		
		Ext.apply(this, {
			
			width	: '95%',
			height	: '30%',
			
			floating	: true,
			centered	: true,
			hideOnMaskTap	: false,
			
			dockedItems : [{
				xtype	: 'toolbar',
				dock	: 'bottom',
				items	: [{
					text	: 'Cancel',
					ui		: 'decline',
					listeners : {
						scope 	: this,
						tap		: function() {
							
							Ext.dispatch({
								controller 	: 'options',
								action		: 'hidePanelOtherNumber'
							});
						}
					}
				},{
					xtype	: 'spacer'
				},{
					text	: 'Save',
					ui		: 'confirm',
					listeners : {
						scope 	: this,
						tap		: function() {
							
							Ext.dispatch({
								controller 	: 'options',
								action		: 'savePanelOtherNumber',
								number		: this.items.items[0].items.items[0].getValue()
							});
						}
					}
				}]
			}],
			
			items : [{
				xtype	: 'formpanel',
				items	:[{
					xtype		: 'textfield',
					placeHolder	: 'other phone number',
					listeners 	: {
						afterrender	: function(textfield) {
							
							textfield.focus();
						}
					}
				}]
			}]
			
		});
		
		MSPhone.views.options.PanelOtherNumber.superclass.initComponent.call(this);
		
	}
	
});

Ext.reg('options_panel_other_number', MSPhone.views.options.PanelOtherNumber);
