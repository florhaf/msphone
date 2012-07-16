Ext.define('MSPhone.model.Recent', {
	extend : 'Ext.data.Model',
	
	config : {
		fields : [{
			name : 'surname',
			type : 'string'
		},{
			name : 'givenname',
			type : 'string'
		},{
			name : 'number',
			type : 'string'
		},{
			name : 'timestamp',
			type : 'string'
		},{
			name : 'times_called',
			type : 'int'
		},{
	    	name : 'name',
	    	type : 'string',
	    	convert : function(v, rec) {
	    		return rec.data.givenname + ' ' + rec.data.surname;
	    	}
	    }]
	}
});