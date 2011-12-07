Ext.namespace('MSPhone.views.contacts');

MSPhone.views.contacts.List = Ext.extend(Ext.List, {
	
	_tpl : new Ext.XTemplate(
		'<div style="margin-left: -44px;">',
			'<table style="height: 32px; width: 99%;">',
				'<tr>',
					'<td style="width: 32px; background: url(resources/images/removeIcon_shadow_only.png) no-repeat center; align: center;">',
						'<div style="width: 32px; height: 32px; margin-top: 1px;">',
							'<img src="resources/images/removeIcon_no_shadow.png" alt="remove icon" />',
						'</div>',
					'</td>',
					'<td>',
						'<div style="margin-left: 10px;">',
							'<b>{last_name}, {first_name}</b>',
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
			compiled : true
		}
	),


initComponent : function() {
        Ext.apply(this, {
			
			itemTpl				: this._tpl,
			selectedItemCls		: 'noselect',
        	pressedCls			: 'nopress',
        	onItemDisclosure 	: true,
        	grouped				: true,
			indexBar			: false,
			scroll				: false,
			width				: '100%',
			listeners 			: {
				scope	: this,
				itemtap : function(list, index, item, ev) {
				
					var target 	= ev.getTarget();
					var contact	= list.getStore().getAt(index);
				
					if (target.className.indexOf('disclosure') != -1) {
						
						Ext.dispatch({
							controller	: 'contacts',
							action		: 'details_onTap',
							contact		: contact
						});
					} else {
						
						if (target.className.indexOf('x-button') != -1) {
							
							Ext.dispatch({
								controller	: 'contacts',
								action		: 'delete_onTap',
								index		: index,
								record		: contact,
								item		: item
							});
						} else {
							
							Ext.dispatch({
								controller	: 'contacts',
								action		: 'item_onTap',
								contact		: contact,
								item		: item
							});
						}
					}
				}
			}
		});
		
		MSPhone.views.contacts.List.superclass.initComponent.call(this);
	}
	
});

Ext.reg('contacts_list', MSPhone.views.contacts.List);
