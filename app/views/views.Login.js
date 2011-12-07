MSPhone.views.Login = Ext.extend(Ext.Panel, {

    initComponent : function() {

        Ext.apply(this, {

            centered        : true,
            floating        : true,
            modal           : true,
            width           : '90%',
            height          : '70%',
            hideOnMaskTap   : false,

            dockedItems : [
                {
                    xtype   : 'toolbar',
                    dock    : 'top',
                    title   : 'Login'
                }
            ],

            layout  : {
                type    : 'vbox',
                align   : 'stretch',
                pack    : 'start'
            },

            items : [
                {
                    cls     : 'infoText',
                    html    : '<div>' + MSPhone.config.Settings.loginText.sessionTimeoutWarnText + '</div>'
                },
                {
                    xtype       : 'fieldset',
                    itemId      : 'loginFieldSet',
                    width       : '95%',
                    defaults    : {
                        labelWidth : '45%'
                    },
                    items       : [
                        {
                            xtype       : 'textfield',
                            itemId      : 'username',
                            placeHolder : 'Username',
                            required    : true,
                            autoCapitalize  : false,
                            useClearIcon    : true
                        },
                        {
                            xtype       : 'passwordfield',
                            itemId      : 'password',
                            placeHolder : '(PIN + SecureID) or SoftID',
                            required    : true,
                            autoCapitalize  : false,
                            useClearIcon    : true
                        }
                    ]
                },
                {
                    xtype   : 'panel',
                    layout  : 'vbox',
                    defaults : {
                        flex : 1
                    },
                    items : [
                        {
                            xtype   : 'button',
                            text    : 'Accept Legal Notice and Login',
                            itemId  : 'submitButton',
                            listeners : {
                                scope : this,
                                tap : function() {

                                    Ext.dispatch({
                                        controller  : 'session',
                                        action      : 'login',
                                        username    : this.query('#username')[0].getValue(),
                                        password    : this.query('#password')[0].getValue()
                                    });
                                }
                            }
                        },
                        {
                            cls     : 'infoText2',
                            html    : MSPhone.config.Settings.loginText.infoText
                        }
                    ]
                }
            ]
        });

        MSPhone.views.Login.superclass.initComponent.call(this);
    }
});

Ext.reg('login', MSPhone.views.Login);