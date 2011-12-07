Ext.namespace('MSPhone.views.keypad');

MSPhone.views.keypad.PanelAction = Ext.extend(Ext.Panel, {

	initComponent : function() {

		Ext.apply(this, {

			width	: '100%',
			height	: '16%',
			layout 	: {
				type : 'hbox',
				pack : 'stretch'
			},
			items	: [{
				xtype	: 'keypad_button_action',
				width	: '33%',
				height	: '100%',
				data	: {
					key		: 'add',
					other	: ''
				}
			}, {
				xtype	: 'button',
				width	: '35%',
				height	: '100%',
				cls		: 'keypadCall',
				html 	: [
					'<table style="margin-left:auto;margin-right:auto;">',
						'<tr>',
							'<td>',
								'<img src="resources/images/keypad/phone.png" style="width:20px;height:20px;margin-right:10px;"/>',
							'</td>',
							'<td>',
								'<b>Call</b>',
							'</td>',
						'</tr>',
					'</table>'
				],
				listeners : {
					scope 	: this,
                    tap     : function() {
                        Ext.dispatch({
							controller 	: 'keypad',
							action 		: 'keyUp',
							key 		: 'call'
						});
					}
				}
			}, {
				xtype 	: 'keypad_button_action',
				width 	: '33%',
				height	: '100%',
				data 	: {
					key 	: 'del',
					other 	: ''
				}
			}]
		});

		MSPhone.views.keypad.PanelAction.superclass.initComponent.call(this);
	}
});

Ext.reg('keypad_panel_action', MSPhone.views.keypad.PanelAction);
