Ext.define('MSPhone.view.Options', {
    extend:'Ext.Container',
    xtype:'options',

    requires:[
        'Ext.form.FieldSet',
        'Ext.field.Select',
        'Ext.field.Checkbox',
        'Ext.field.Password'
    ],

    config:{
        id:'options',
        scrollable:'vertical',
        items:[
            {
                xtype:'toolbar',
                docked:'top',
                title:'Settings'
            },
            {
                xtype:'button',
                cls : 'x-ms-button',
                width:'95%',
                height:'30px',
                text:'Help Desk',
                listeners:{
                    tap:function () {

                        this.getParent().fireEvent('callHelpDesk');
                    }
                }
            },
            {
                cls:'ecsTitle',
                html:'Callback Number'
            },
            {
                xtype:'selectfield',
                cls:'callbackDropdown',
                name:'callback_numbers',
                listeners:{
                    change:function (comp, value) {

                        this.getParent().getParent().fireEvent('setCallbackNumber', value.data.value);
                    }
                }
            },
            {
                xtype:'button',
                text:'Add new',
                cls : 'x-ms-button buttonAddNew',
                name:'newCallbackNumber',
                width:'120px',
                listeners:{
                    tap:function () {

                        var me = this;

                        Ext.Msg.prompt('New', 'callback number with country code', function (buttonId, value) {

                            if (buttonId == 'ok') {

                                me.getParent().getParent().fireEvent('setCallbackNumber', value);
                            }

                        });
                    }
                }
            },
            {
                cls:'ecsTitle',
                html:'Call Forwarding'
            },

            {
                cls:'ecsText',
                html:'When set to on, this feature will ring both your mobile phone and your desk phone.'
            },
            {

                xtype:'button',
                text:'Activate ECS',
                name:'newCallbackNumber',
                width:'120px',
                cls:'x-ms-button buttonAddNew',
                listeners:{
                    tap:function () {
                    }
                }

//                xtype:'checkboxfield',
//                label:'call forwarding',
//                name:'ecs',
//                listeners:{
//                    check:function () {
//
//                        var me = this;
//
//                        Ext.Msg.prompt('ECS', 'PIN', function (buttonId, value) {
//
//                            if (buttonId == 'ok') {
//
//                                me.getParent().getParent().fireEvent('setEcs', value);
//                            }
//                        });
//                    },
//                    uncheck:function () {
//
//                        this.getParent().items.items[1].setValue('');
//
//                        this.getParent().getParent().fireEvent('setEcs', { action:false, pin:'' });
//                    }
//                }
            }
        ],
        listeners:{
            painted:function () {

                this.fireEvent('customPainted', this);
            }
        }
    }
});
