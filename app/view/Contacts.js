Ext.define('MSPhone.view.Contacts', {
    extend  : 'Ext.Container',
    xtype   : 'contacts',

    requires : [
                'Ext.field.Search',
        'MSPhone.view.contacts.Personal',
        'MSPhone.view.contacts.Directory',
        'MSPhone.view.contacts.Crm',
    ],
    
    
    config  : {
        id      : 'contacts',
        layout	: {
        	type : 'card'
//        	animation : {
//        		duration : 200,
//        		easing : 'ease-out',
//        		type : 'slide',
//        		direction : 'left'
//        	}
        },
        items	: [{
        	xtype : 'toolbar',
        	docked : 'top',
        	items : [{
	    		xtype	: 'segmentedbutton',
	    		width	: '100%',
	    		defaults: {
	    			flex	: 1,
	    			listeners : {
	    				tap : function(btn) {
	    					
	    					var view = this.getParent().getParent().getParent();
	    					
	    					view.setActiveItem(btn.card);
	    				}
	    			}
	    		},
	    		items	: [{
	    			text	: 'Personal',
	    			pressed : true,
	    			card	: 0
	    			
	    		},{
	    			text	: 'Directory',
	    			card	: 1
	    		},{
	    			text	: 'CRM',
	    			card	: 2
	    		}]
	    	},{
	    		xtype : 'button',
	    		text : 'Back',
	    		ui : 'back',
	    		hidden : true,
	    		showAnimation : 'slideIn',
	    		hideAnimation : 'slideOut',
	    		listeners : {
    				tap : function(btn) {
    					
    					var view = this.getParent().getParent();
    					
    					view.fireEvent('back');
    				}
    			}
	    	}]
        },{
        	xtype	: 'contacts_personal'
        }
        ,{
        	xtype	: 'contacts_directory'
        },{
        	xtype	: 'contacts_crm'
        }
        ]
    }
});
