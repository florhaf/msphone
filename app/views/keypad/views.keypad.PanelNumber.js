MSPhone.views.keypad.PanelNumber = Ext.extend(Ext.Panel, {

	initComponent : function() {

		Ext.apply(this, {

			width	: '100%',
			height	: '100%',
			items	: [{
				// 1st row
				xtype : 'panel',
				width	: '100%',
				height	: '26%',
				layout : {
					type : 'hbox',
					pack : 'center'
				},
				items : [{
					xtype	: 'keypad_button_number',
					width	: '33%',
					height	: '100%',
					data	: {
						key		: '1',
						other	: '.'
					}
				}, {
					xtype	: 'keypad_button_number',
					width	: '35%',
					height	: '100%',
					data	: {
						key		: '2',
						other	: 'ABC'
					}
				}, {
					xtype	: 'keypad_button_number',
					width	: '33%',
					height	: '100%',
					data	: {
						key		: '3',
						other	: 'DEF'
					}
				}]
			}, {
				// 2nd row
				xtype	: 'panel',
				width	: '100%',
				height	: '25%',
				layout 	: {
					type : 'hbox',
					pack : 'center'
				},
				items 	: [{
					xtype	: 'keypad_button_number',
					width	: '33%',
					height	: '100%',
					data	: {
						key		: '4',
						other	: 'GHI'
					}
				}, {
					xtype	: 'keypad_button_number',
					width	: '35%',
					height	: '100%',
					data	: {
						key		: '5',
						other	: 'JKL'
					}
				}, {
					xtype	: 'keypad_button_number',
					width	: '33%',
					height	: '100%',
					data	: {
						key		: '6',
						other	: 'MNO'
					}
				}]
			}, {
				// 3rd row
				xtype	: 'panel',
				width	: '100%',
				height	: '25%',
				layout 	: {
					type : 'hbox',
					pack : 'center'
				},
				items 	: [{
					xtype	: 'keypad_button_number',
					width	: '33%',
					height	: '100%',
					data	: {
						key		: '7',
						other	: 'PQRS'
					}
				}, {
					xtype	: 'keypad_button_number',
					width	: '35%',
					height	: '100%',
					data	: {
						key		: '8',
						other	: 'TUV'
					}
				}, {
					xtype	: 'keypad_button_number',
					width	: '33%',
					height	: '100%',
					data	: {
						key		: '9',
						other	: 'WXYZ'
					}
				}]
			}, {
				// 4th row
				xtype	: 'panel',
				width	: '100%',
				height	: '25%',
				layout	: {
					type : 'hbox',
					pack : 'center'
				},
				items	: [{
					xtype	: 'keypad_button_number',
					width	: '33%',
					height	: '100%',
					data	: {
						key		: '*',
						other	: ''
					}
				}, {
					xtype	: 'keypad_button_number',
					width	: '35%',
					height	: '100%',
					data	: {
						key		: '0',
						other	: '+'
					}
				}, {
					xtype	: 'keypad_button_number',
					width	: '33%',
					height	: '100%',
					data	: {
						key		: '#',
						other	: ''
					}
				}]
			}]
		});

		MSPhone.views.keypad.PanelNumber.superclass.initComponent.call(this);
	}
});

Ext.reg('keypad_panel_number', MSPhone.views.keypad.PanelNumber);
