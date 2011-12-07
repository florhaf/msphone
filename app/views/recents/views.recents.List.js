Ext.namespace('MSPhone.views.recents');

MSPhone.views.recents.List = Ext.extend(Ext.List, {
	
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
							'<tpl if="first_name==&quot;&quot;">',
								'<b>{numberFormatted}</b>',
							'</tpl>',
							'<tpl if="first_name!=&quot;&quot;">',
								'<b>{last_name}, {first_name}</b>',
							'</tpl>',
							'<tpl if="times_called&gt;1;">',
								'&nbsp;({times_called})',
							'</tpl>',
							'<br /><font style="font-size: 11px; color: gray;">{dateFormatted}</font>',
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
			listeners 			: {
				scope	: this,
				itemtap : function(list, index, item, ev) {
				
					var target 	= ev.getTarget();
					var recent	= list.getStore().getAt(index);
				
					if (target.className.indexOf('disclosure') != -1) {
						
						Ext.dispatch({
							controller	: 'recents',
							action		: 'details_onTap',
							recent		: recent
						});
					} else {
						
						if (target.className.indexOf('x-button') != -1) {
							
							Ext.dispatch({
								controller	: 'recents',
								action		: 'delete_onTap',
								index		: index,
								record		: recent,
								item		: item
							});
						} else {
							
							Ext.dispatch({
								controller	: 'recents',
								action		: 'item_onTap',
								recent		: recent,
								item		: item
							});
						}
					}
				}
			}
		});
		
		MSPhone.views.recents.List.superclass.initComponent.call(this);
	}
	
});

Ext.reg('recents_list', MSPhone.views.recents.List);
