Ext.regModel('contact', {
    fields: [{
    	name: 'id',
    	type: 'int'
    },{
    	name: 'id_contact',
    	type: 'int'
    },{
    	name: 'last_name',
		type: 'string'
	},{
    	name: 'first_name',
		type: 'string'
	},{
    	name: 'work_number',
		type: 'string'
	},{
		name: 'work_formatted_number',
		type: 'string'
	},{
		name: 'mobile_number',
		type: 'string'
	},{
		name: 'mobile_formatted_number',
		type: 'string'
	},{
		name: 'email',
		type: 'string'
	},{
		name: 'building',
		type: 'string'
	},{
		name: 'floor',
		type: 'string'
	},{
		name: 'presence',
		type: 'string'
	},{
		name: 'picture',
		type: 'string'
	},{
        name: 'street',
		type: 'string'
    },{
        name: 'company',
		type: 'string'
    }]
});