Ext.namespace('MSPhone.views.details');

MSPhone.views.details.Toolbar = Ext.extend(Ext.Toolbar, {
	
	controller	: null,
	
	initComponent : function() {
		
		Ext.apply(this, {
			
			dock	: 'top',
			title	: (Ext.isEmpty(this.title)) ? 'Info' : this.title,
			items	: [{
				xtype	: 'button',
				text	: 'Back',
				listeners : {
					scope	: this,
					tap 	: function() {
						
						Ext.dispatch({
							controller 	: this.controller,
							action		: 'back_onTap'
						});
					}
				}
			},{
                xtype   : 'spacer'
            },{
                xtype	: 'button',
                text	: 'Edit',
                listeners : {
                    scope	: this,
                    tap 	: function() {

                        Ext.dispatch({
							controller 	: 'contacts',
							action		: 'editContact_onTap'
						});
                    }
                }
            }]
		});
		
		MSPhone.views.details.Toolbar.superclass.initComponent.call(this);
	}
});

Ext.reg('details_toolbar', MSPhone.views.details.Toolbar);
