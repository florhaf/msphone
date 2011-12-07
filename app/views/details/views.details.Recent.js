Ext.namespace('MSPhone.views.details');

MSPhone.views.details.Recent = Ext.extend(Ext.Panel, {

	initComponent : function() {

		Ext.apply(this, {

			layout : {
				type : 'card'
			},
			html : 'yo yo',
			items : [{
				
			}]
		});

		MSPhone.views.details.Recent.superclass.initComponent.call(this);
	}
});

Ext.reg('details_recent', MSPhone.views.details.Recent);
