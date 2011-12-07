Ext.namespace('MSPhone.views.keypad');

MSPhone.views.keypad.PanelDial = Ext.extend(Ext.Panel, {

	initComponent : function() {

		Ext.apply(this, {

			height 	: '70px', //'17%',
			width	: '100%',
			cls		: 'keypadNumberPanel',
			items	: [{
				xtype		: 'panel',
				centered 	: true,
				tpl			: '<div style="padding-top:3%">{number}</div>'
			}]
		});
		
		MSPhone.views.keypad.PanelDial.superclass.initComponent.call(this);
	}
});

Ext.reg('keypad_panel_dial', MSPhone.views.keypad.PanelDial);
