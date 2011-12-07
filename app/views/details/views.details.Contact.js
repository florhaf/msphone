Ext.namespace('MSPhone.views.details');

MSPhone.views.details.Contact = Ext.extend(Ext.Panel, {

	initComponent : function() {

		Ext.apply(this, {
            
            width   : '100%',
            layout  : 'vbox',
            scroll  : 'vertical',
            cls     : 'vertical stripes',
            defaults: {
                margin : '15 0 0 0'
            },
			items : [{
                xtype   : 'panel',
                width   : '90%',
                html    : [
                    '<div>',
                        '<table>',
                            '<tr>',
                                '<td style="width: 80px; height: 66px;">',
                                    '<img src="resources/images/contact_generic.png" alt="picture" />',
                                '</td>',
                                '<td>',
                                    '<span style="font-size: 18px; font-weight: bold;">',
                                        'Florian Haftman', // '{first_name} {lastbane}',
                                    '</span>',
                                '</td>',
                            '</tr>',
                        '</table>',
                    '</div>'
                ]
            },{
                xtype   : 'button',
                width   : '95%',
                height  : '40px',
                ui      : 'normal',
                html    : [
                    '<table style="width: 100%;">',
                        '<tr>',
                            '<td style="vertical-align: top; width: 25%">',
                                '<span style="color: #556a94; font-size: 14px; font-weight: bold;">',
                                    'mobile',
                                '</span>',
                            '</td>',
                            '<td>',
                                '<span style="font-size: 14px; font-weight: bold;">',
                                    '+1 (347) 463-8137',
                                '</span>',
                            '</td>',
                        '</tr>',
                    '</table>'
                ]
            },{
                xtype   : 'button',
                width   : '95%',
                height  : '40px',
                ui      : 'normal',
                html    : [
                    '<table style="width: 100%;">',
                        '<tr>',
                            '<td style="vertical-align: top; width: 25%;">',
                                '<span style="color: #556a94; font-size: 14px; font-weight: bold;">',
                                    'work',
                                '</span>',
                            '</td>',
                            '<td>',
                                '<span style="font-size: 14px; font-weight: bold;">',
                                    '+1 (212) 276 0405',
                                '</span>',
                            '</td>',
                        '</tr>',
                    '</table>'
                ]
            },{
                xtype   : 'button',
                width   : '95%',
                height  : '40px',
                ui      : 'normal',
                html    : [
                    '<table style="width: 100%;">',
                        '<tr>',
                            '<td style="vertical-align: top; width: 25%;">',
                                '<span style="color: #556a94; font-size: 14px; font-weight: bold;">',
                                    'email',
                                '</span>',
                            '</td>',
                            '<td>',
                                '<span style="font-size: 14px; font-weight: bold;">',
                                    'florian.haftman@morganst...',
                                '</span>',
                            '</td>',
                        '</tr>',
                    '</table>'
                ]
            },{
                xtype   : 'button',
                width   : '95%',
                ui      : 'normal',
                html    : [
                    '<table style="width: 100%;">',
                        '<tr>',
                            '<td style="vertical-align: top; width: 25%;">',
                                '<span style="color: #556a94; font-size: 14px; font-weight: bold;">',
                                    'address',
                                '</span>',
                            '</td>',
                            '<td>',
                                '<span style="font-size: 14px; font-weight: bold;">',
                                    '401 E 34th <br />',
                                    'New York NY 10016 <br />',
                                    'United States',
                                '</span>',
                            '</td>',
                        '</tr>',
                    '</table>'
                ]
            }],
            listeners : {
		    	scope		: this,
		    	afterrender : function() {

    				Ext.dispatch({
						controller	: 'details',
						action		: 'load',
						view		: this
					});
		    	}
		    }
		});

		MSPhone.views.details.Contact.superclass.initComponent.call(this);
	}
});

Ext.reg('details_contact', MSPhone.views.details.Contact);
