Ext.define('MSPhone.model.Contact', {
	extend : 'Ext.data.Model',
	
	config : {
	    fields: [{
	    	name : 'bu',
	    	type : 'string'
	    },{
	    	name : 'email',
	    	type : 'string'
	    },{
	    	name : 'givenname',
	    	type : 'string'
	    },{
	    	name : 'homephone',
	    	type : 'string'
	    },{
	    	name : 'mobile',
	    	type : 'string'
	    },{
	    	name : 'name',
	    	type : 'string'
	    },{
	    	name : 'surname',
	    	type : 'string'
	    },{
	    	name : 'title',
	    	type : 'string'
	    },{
	    	name : 'workphone',
	    	type : 'string'
	    },{
	    	name : 'name',
	    	type : 'string',
	    	convert : function(v, rec) {
	    		return rec.data.givenname + ' ' + rec.data.surname + ' ' + rec.data.givenname;
	    	}
	    }]
	}
});