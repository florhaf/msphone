Ext.define('MSPhone.view.Recents', {
    extend  : 'Ext.List',
    xtype   : 'recents',

    config  : {
        id      : 'recents',
        disableSelection : true,
        store		: 'Recents',
        items	: [{
        	xtype	: 'toolbar',
        	docked	: 'top',
        	title	: 'Recent Calls',
        	items	: [{
        		xtype	: 'spacer'
        	},{
        		xtype	: 'button',
        		text	: 'Edit',
        		listeners : {
        			tap : function(button) {

                        this.getParent().getParent().fireEvent('edit', button);
        			}
        		}
        	}]
        }],
        itemTpl : new Ext.XTemplate(
        		'<div class="recent-item" style="margin-left: -44px;">',
    			'<table style="height: 32px; width: 95%;">',
    				'<tr>',
    					'<td style="width: 32px; background: url(resources/images/removeIcon_shadow_only.png) no-repeat center; align: center;">',
    						'<div style="width: 32px; height: 32px; margin-top: 1px;">',
    							'<img src="resources/images/removeIcon_no_shadow.png" alt="remove icon" />',
    						'</div>',
    					'</td>',
    					'<td>',
    						'<div style="margin-left: 10px;">',
    							'<tpl if="surname == null">',
    								'<b>{number}</b>',
    							'</tpl>',
    							'<tpl if="surname != null">',
    								'<b>{givenname}, {surname}</b>',
    							'</tpl>',
    							'<tpl if="times_called &gt; 1">',
    								'&nbsp;({times_called})',
    							'</tpl>',
    							'<br /><font style="font-size: 11px; color: gray;">{[this.formatDate(values.timestamp)]}</font>',
    						'</div>',
    					'</td>',
    					'<td style="width: 55px; align: right;">',
    						'<div style="-webkit-transform: scaleX(0);">',
    							'<div class="x-button x-button-decline">',
    								'<span class="x-button-label" style="font-size: 12px;">Delete</span>',
    							'</div>',
    						'</div>',
    					'</td>',
    				'</tr>',
    			'</table>',
    		'</div>',
    		{
    			compiled : true,
    			formatDate : function(timestamp) {
    				
    				var date = new Date(timestamp * 1000);
    				return date.toString('MM-dd-yyyy h:m');
    			}
    		}
        )
    }
});
