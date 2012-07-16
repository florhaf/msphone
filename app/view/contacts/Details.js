Ext.define('MSPhone.view.contacts.Details', {
	extend	: 'Ext.form.Panel',
	xtype	: 'contacts_details',
	
	config : {

			//html : 'contact details',
//			layout : {
//				type : 'card'
//			},
title : 'Details',
		showAnimation : 'slideIn',
		//hideAnimation : 'slideOut',
//
//		tpl : new Ext.XTemplate(
//				'{bu}<br />{email}<br />{givenname}<br />{homephone}<br />{mobile}<br />{name}<br />{surname}<br />{title}<br />{workphone}'
//				, { compiled : true })
//			
//			
//			
//			
		defaults : {
			clearIcon : false,
			readonly : true
		},
		items : [{
			xtype : 'textfield',
			name : 'surname',
			label : 'SurName'
		},{
			xtype : 'textfield',
			name : 'givenname',
			label : 'GivenName'
		},{
			xtype : 'textfield',
			name : 'title',
			label : 'Title'
		},{
			xtype : 'textfield',
			name : 'bu',
			label : 'BU'
		},{
			xtype : 'textfield',
			name : 'workphone',
			label : 'Call Work',
			cls : 'x-button'
		},{
			xtype : 'textfield',
			name : 'mobile',
			label : 'Call Mobile',
			cls : 'x-button'
		},{
			xtype : 'textfield',
			name : 'homephone',
			label : 'Call Home',
			cls : 'x-button'
		}],
		listeners : {
			painted : function() {
				
				this.setValues(this.getData());
			}
		}
	}
});