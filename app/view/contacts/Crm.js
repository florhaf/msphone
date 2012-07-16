Ext.define('MSPhone.view.contacts.Crm', {
	extend	: 'Ext.List',
	xtype	: 'contacts_crm',
	
	 config  : {
	        disableSelection : true,

	        items	: [{
	        	xtype	: 'toolbar',
	        	docked	: 'top',
                ui      : 'light',
                cls     : 'msToolbar',
	        	items	: [{
	        		xtype	: 'searchfield',
	        		width	: '95%',
					placeHolder : 'Search MS CRM',
					listeners : {
						keyup : function(field, ev) {

							var isDelKey = (ev.browserEvent.keyCode == 8);
							var isEnterKey = (ev.browserEvent.keyCode == 13);

							MSPhone.app.fireEvent('contacts_crm_search', { searchValue : field.getValue(), isDelKey : isDelKey, isEnterKey : isEnterKey });
						}
					}
    			}]
	        }],
	        itemTpl : new Ext.XTemplate(
				'<b>{surname}</b>, {givenname} ({bu})',
	    		{
	    			compiled : true
	    		}
	        ),
	        onItemDisclosure : function(record) {

	        	this.fireEvent('show_details', record);
	        }
	    }
});