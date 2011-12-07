Ext.namespace('MSPhone.views.keypad');

MSPhone.views.keypad.ButtonAction = Ext.extend(Ext.Button, {
	
	data	: null,
	key		: null,

	initComponent : function() {

		this.key = this.data.key;

		Ext.apply(this, {

			html 	: '<img src="resources/images/keypad/' + this.key + '.png" style="width:27px;height:17px;margin-left:auto;margin-right:auto;"/>',
			cls 	: 'keypadButtonAction',
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

		MSPhone.views.keypad.ButtonAction.superclass.initComponent.call(this);
	}
});

Ext.reg('keypad_button_action', MSPhone.views.keypad.ButtonAction);