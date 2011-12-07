Ext.regModel('options', {
    fields: [{
    	name: 'callback_update',
		type: 'bool'
	},{
    	name: 'ecs',
		type: 'bool'
	},{
    	name: 'ecs_pin',
		type: 'string'
	},{
		name: "voicemail_notification",
		type: "bool"
	},{
    	name: 'voicemail_pin',
		type: 'string'
	}],
	
	hasMany : [{
		model	: 'callback_number',
		name	: 'callback_numbers',
		associationKey	: 'callback_numbers'
	}]
});