Ext.namespace('MSPhone.stores.');

MSPhone.stores.Offline = Ext.extend(Ext.data.Store, {

	autoLoad : false,

	constructor : function(config) {
		config = config || {};

		Ext.applyIf(config, {

			model	: config.model,
			proxy 	: {
				type 	: 'localstorage',
				timeout : 5000,
				id		: config.id
			}
		});

		MSPhone.stores.Offline.superclass.constructor.call(this, config);
	}
});

Ext.reg('offline_store', MSPhone.stores.Offline);