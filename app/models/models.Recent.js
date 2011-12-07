Ext.regModel('recent', {
    fields: [{
    	name: 'id',
    	type: 'int'
    },{
    	name: 'id_contact',
    	type: 'string'
    },{
		name: 'dateFormatted',
		type: 'string'
	},{
		name: 'dateSorting',
		type: 'string'
	},{
		name: 'numberFormatted',
		type: 'string'
	},{
		name: 'number',
		type: 'string'
	},{
		name: 'times_called',
		type: 'int'
	},{
		name: 'first_name',
		type: 'string'
	},{
		name: 'last_name',
		type: 'string'
	}]
});