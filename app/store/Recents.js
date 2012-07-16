Ext.define('MSPhone.store.Recents', {
    extend: 'Ext.data.Store',

    config: {
        autoLoad    : true,
        
        sorters     : {
        	sorterFn : function(record1, record2) {
        		
        		return record1.timestamp > record2.timestamp ? -1 : 1;
        	},
        	direction : 'ASC'
        },
        proxy       : {
            model   : 'MSPhone.model.Recent',
            type 	: 'localstorage',
			id		: 'recents'

        }
    }
});
