/**
 * @class MSPhone.Viewport
 * @extends Ext.Panel
 * This is a default generated class which would usually be used to initialize your application's
 * main viewport. By default this is simply a welcome screen that tells you that the app was
 * generated correctly.
 */
MSPhone.views.Viewport = Ext.extend(Ext.TabPanel, {

	_viewRecents 	: null,
	_viewContacts	: null,
	_viewIconf		: null,
	_viewKeypad		: null,
	_viewOptions	: null,

	initComponent : function() {

		Ext.apply(this, {

			id 			: 'viewport',
			layout 		: 'card',
			fullscreen 	: true,
			cardSwitchAnimation : {
				type		: 'slide',
				duration	: 0.1
			},

			tabBar : {
				dock : 'bottom',
				layout : {
					pack : 'center'
				}
			},

			items : [{
				xtype	: 'recents'
			}, {
				xtype	: 'contacts'
			}, {
				xtype	: 'iconf'
			}, {
				xtype	: 'keypad'
			}, {
				xtype	: 'options'
			}],
			
			listeners : {
				scope		: this,
				afterrender : function() {
					
					Ext.dispatch({
						controller	: 'viewport',
						action		: 'load',
						view		: this
					});
				}
			}

		});

        Ext.dispatch({
            controller  : 'session',
            action      : 'load'
        });

		MSPhone.views.Viewport.superclass.initComponent.apply(this, arguments);
	}
});
