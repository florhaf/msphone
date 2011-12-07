MSPhone.views.keypad.PanelWaiting = Ext.extend(Ext.Panel, {
	
	initComponent : function() {
		
		Ext.apply(this, {
			
			width	: '33%',
			height	: '33%',
			html	: 'calling',

			centered		: true,
			floating		: true,
			hideOnMaskTap	: false
		});
		
		MSPhone.views.keypad.PanelWaiting.superclass.initComponent.call(this);
	}
	
});

Ext.reg('keypad_panel_waiting', MSPhone.views.keypad.PanelWaiting);
