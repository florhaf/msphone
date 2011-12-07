Ext.namespace('MSPhone.stores.');

MSPhone.stores.Online = Ext.extend(Ext.data.Store, {

	autoLoad : false,

	constructor : function(config) {
		config = config || {};

		Ext.applyIf(config, {

			proxy : {
				type 	: 'ajax',
				timeout : 5000,
				url 	: config.url,
				reader 	: {
					type : 'json-object',
					root : config.root
				}
			}
		});

		MSPhone.stores.Online.superclass.constructor.call(this, config);
	}
});

Ext.reg('online_store', MSPhone.stores.Online);