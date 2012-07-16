Ext.define('MSPhone.controller.QuickDial', {
    extend	: 'Ext.app.Controller',

    config : {
        refs : {
            view : 'quickdial'
        },
        control : {
            view : {
                callHelpDesk : 'callHelpDesk',
                callVoiceMail : 'callVoiceMail'
            }
        },

        callVoiceMail : function(options) {

            this.getView().setMasked({
                xtype	: 'loadmask',
                message	: 'Calling voicemail...'
            });

            Ext.Ajax.request({
                url			: '/mobile/msphoneios/webapp/service/rest/callvoicemail',
                method		: 'POST',
                scope		: this,
                callback	: this.callback,
                params		: {
                    pin : options.pin
                }
            });
        },
        callHelpDesk : function() {

            this.getView().setMasked({
                xtype	: 'loadmask',
                message	: 'Calling helpdesk...'
            });

            Ext.Ajax.request({
                url			: '/mobile/msphoneios/webapp/service/rest/callhelpdesk',
                method		: 'GET',
                scope		: this,
                callback	: this.callback
            });
        }
    }
});