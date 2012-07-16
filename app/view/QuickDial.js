Ext.define('MSPhone.view.QuickDial', {
    extend  : 'Ext.Container',
    xtype   : 'quickdial',

    config: {
        id      : 'quickdial',
        scrollable : 'vertical',
        layout: {
          align: 'center'
        },
        items	: [{
            xtype	: 'toolbar',
            docked	: 'top',
            title	: 'Quick Dial'
        },{
            xtype : 'button',
            cls : 'x-ms-button',
            text : 'Voicemail',
            width: '95%',
            height: '30px',
            listeners : {
                tap : function() {

                    var me = this;

                    Ext.Msg.prompt('Voicemail', 'Enter your voicemail PIN', function(buttonId, value){

                        if (buttonId == 'ok') {

                            me.getParent().fireEvent('callVoiceMail', value);
                        }
                    });
                }
            }
        },{
            xtype : 'button',
            cls : 'x-ms-button',
            width: '95%',
            height: '30px',
            text : 'Help Desk',
            listeners : {
                tap : function() {

                    this.getParent().fireEvent('callHelpDesk');
                }
            }
        }]
    }
});