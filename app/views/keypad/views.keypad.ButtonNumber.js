Ext.namespace('MSPhone.views.keypad');

MSPhone.views.keypad.ButtonNumber = Ext.extend(Ext.Button, {

	data	: null,
	key		: null,

	initComponent : function() {

		this.key = this.data.key;

		Ext.apply(this, {

			data	: this.data,
			cls		: 'keypadButtonNumber',
			tpl		: new Ext.XTemplate(
				'<table style="margin-left:auto;margin-right:auto;">',
					'<tr>',
						'<td>',
							'{key}',
						'</td>',
					'</tr>',
					'<tr>',
						'<td style="font-size:50%;color:transparent;">',
							'{other}',
						'</td>',
					'</tr>',
				'</table>'
			),
			listeners : {
				scope	: this,
                tap        : function() {
                    Ext.dispatch({
						controller	: 'keypad',
						action		: 'keyUp',
						key			: this.key
					})
				}
			}
		});

		MSPhone.views.keypad.ButtonNumber.superclass.initComponent.call(this);
	}
});

Ext.reg('keypad_button_number', MSPhone.views.keypad.ButtonNumber);
