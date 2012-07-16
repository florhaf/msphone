Ext.Loader.setConfig({
    enabled: true,
    disableCaching : false
});

Ext.Loader.setPath('Ext', 'lib/touch2/src');

Ext.application({
    name                : 'MSPhone',

    requires            : [
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.SegmentedButton',
        'Ext.data.proxy.LocalStorage'
    ],

    views               : [
        'Recents',
        'Contacts',
        'Keypad',
        'Options',
        'QuickDial'
    ],

    models              : [
       'Recent',
       'Contact'
    ],

    stores              : [
       'Recents'
    ],

    controllers         : [
       'Recents',
       'Contacts',
       'Keypad',
       'Options',
        'QuickDial'
    ],

    launch: function() {

        Ext.Viewport.add({
            xtype   : 'tabpanel',
            tabBar  : {
                docked  : 'bottom'
            },
            layout  : {
                animation   : null
            },
            items   : [{
            	xtype   : 'recents',
                title   : 'Recents',
                iconCls	: 'msPhoneRecents'                
            },{
            	xtype   : 'contacts',
                title   : 'Contacts',
                iconCls	: 'msPhoneContacts'
            },{
            	xtype   : 'keypad',
                title   : 'Keypad',
                iconCls : 'msPhoneKeypad'
            },{
                xtype   : 'quickdial',
                title   : 'Quick Dial',
                iconCls : 'msPhoneVoicemail'
            },{
            	xtype   : 'options',
                title   : 'Settings',
                iconCls : 'msPhoneOptions'          	
            }]
        });
    }
});
