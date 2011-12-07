MSPhone.views.Options = Ext.extend(Ext.form.FormPanel, {
	
	initComponent : function() {
		
		Ext.apply(this, {
			
			title 	: 'Options',
			iconCls : 'msPhoneOptions',
			scroll	: 'vertical',
			url		: 'some_url_to_save_settings.php',
			
			dockedItems	: [{
				xtype 	: 'toolbar',
				dock	: 'top',
				title	: 'Options'
			}],
			
			items	: [{
				xtype	: 'fieldset',
				title	: 'Callback number',
				defaults : {
					labelAlign	: 'left',
					labelWidth	: '50%'
				},
				items	: [{
					xtype	: 'selectfield',
					name	: 'callback_numbers',
					displayField 	: 'formatted_number',
					valueField		: 'number',
 					listeners : {
 						scope	: this,
 						change 	: function(select, value) {
 							
 							if (value == 4) {
 								
 								Ext.dispatch({
	 								controller	: 'options',
	 								action		: 'showPanelOtherNumber' 
	 							});
 							}
 						}
 					}
				}, {
					xtype	: 'checkboxfield',
					label	: 'update on start',
					name	: 'callback_update'
				}]
			}, {
				xtype	: 'fieldset',
				title	: 'ECS',
				defaults : {
					labelAlign	: 'left',
					labelWidth	: '50%'
				},
				items	: [{
					xtype	: 'checkboxfield',
					label	: 'call forwarding',
					name	: 'ecs'
				}, {
					xtype	: 'passwordfield',
					label	: 'PIN',
					name	: 'ecs_pin'
				}]
			}, {
				xtype	: 'fieldset',
				title	: 'Voicemail',
				defaults : {
					labelAlign	: 'left',
					labelWidth	: '50%'
				},
				items	: [{
					xtype	: 'checkboxfield',
					label	: 'notification',
					name	: 'voicemail_notification'
				}, {
					xtype	: 'passwordfield',
					label	: 'PIN',
					name	: 'voicemail_pin'
				}]
			}],
			listeners : {
		    	scope		: this,
		    	afterrender : function() {
		    		
    				Ext.dispatch({
						controller	: 'options',
						action		: 'load',
						view		: this
					});
		    	}
		    }
			
		});
		
		MSPhone.views.Options.superclass.initComponent.call(this);
		
	}
	
});


Ext.reg('options', MSPhone.views.Options);