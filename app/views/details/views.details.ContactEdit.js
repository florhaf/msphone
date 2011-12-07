Ext.namespace('MSPhone.views.details');

MSPhone.views.details.ContactEdit = Ext.extend(Ext.form.FormPanel, {

    initComponent : function() {

        Ext.apply(this, {
            cls   : 'vertical stripes',
            scroll: 'vertical',
            items : [{
                xtype   : 'fieldset',
                title   : 'General',
                defaults: {
                    labelAlign  : 'left',
                    labelWidth  : '35%',
                    autoCapitalize: true
                },
                items   : [{
                        xtype   : 'textfield',
                        name    : 'first_name',
                        label   : 'First name'
                    },{
                        xtype   : 'textfield',
                        name    : 'last_name',
                        label   : 'Last name'
                    },{
                        xtype   : 'textfield',
                        name    : 'company',
                        label   : 'Company'
                    }]
            },{
                xtype   : 'fieldset',
                title   : 'Contact',
                defaults: {
                    labelAlign  : 'left',
                    labelWidth  : '35%',
                    autoCapitalize: false
                },
                items   : [{
                        xtype   : 'textfield',
                        name    : 'work_formatted_number',
                        label   : 'Work'
                    },{
                        xtype   : 'textfield',
                        name    : 'mobile_formatted_number',
                        label   : 'Mobile'
                    },{
                        xtype   : 'emailfield',
                        name    : 'email',
                        label   : 'Email'
                    }]
            },{
                xtype   : 'fieldset',
                title   : 'Location',
                defaults: {
                    labelAlign  : 'left',
                    labelWidth  : '35%',
                    autoCapitalize: false
                },
                items   : [{
                        xtype   : 'textfield',
                        name    : 'street',
                        label   : 'Street'
                    },{
                        xtype   : 'textfield',
                        name    : 'city',
                        label   : 'City'
                    },{
                        xtype   : 'textfield',
                        name    : 'zip',
                        label   : 'ZIP'
                    },{
                        xtype   : 'textfield',
                        name    : 'state',
                        label   : 'State'
                    }]
            }],
            listeners : {
                scope       : this,
                afterrender : function() {

                    Ext.dispatch({
                        controller  : 'details',
                        action      : 'load',
                        view        : this
                    });
                }
            }
        });

        MSPhone.views.details.ContactEdit.superclass.initComponent.call(this);
    }
});

Ext.reg('details_contact_edit', MSPhone.views.details.ContactEdit);
