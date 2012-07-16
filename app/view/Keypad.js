Ext.define('MSPhone.view.Keypad', {
    extend  : 'Ext.Container',
    xtype   : 'keypad',

    config  : {
        id      : 'keypad',
        layout	: {
        	type	: 'vbox',
        	pack	: 'center',
        	align	: 'stretch'
        },
        defaults: {
        	width	: '100%',
        	layout	: {
            	type	: 'hbox',
            	pack	: 'center',
            	align	: 'stretch'
            }
        },
        items	: [{
        	cls : 'keypadNumberPanel',
        	height	: (window.innerHeight - 44) * 0.18
        },{
        	height	: (window.innerHeight - 44) * 0.16,
        	defaults: {
        		flex	: 1,
        		cls : 'keypadButtonNumber',
        		listeners : {
        			tap : function(button) {
        				
        				button.getParent().getParent().fireEvent('key_up', button.getText());
        			}
        		}
        	},
        	items	: [{
        		xtype 	: 'button',
        		text	: '1'
        	},{
        		xtype 	: 'button',
        		text	: '2'
        	},{
        		xtype 	: 'button',
        		text	: '3'
        	}]
        },{
        	height	: (window.innerHeight - 44) * 0.16,
        	defaults: {
        		flex	: 1,
        		cls : 'keypadButtonNumber',
        		listeners : {
        			tap : function(button) {
        				
        				button.getParent().getParent().fireEvent('key_up', button.getText());
        			}
        		}
        	},
        	items	: [{
        		xtype 	: 'button',
        		text	: '4'
        	},{
        		xtype 	: 'button',
        		text	: '5'
        	},{
        		xtype 	: 'button',
        		text	: '6'
        	}]
        },{
        	height	: (window.innerHeight - 44) * 0.16,
        	defaults: {
        		flex	: 1,
        		cls : 'keypadButtonNumber',
        		listeners : {
        			tap : function(button) {
        				
        				button.getParent().getParent().fireEvent('key_up', button.getText());
        			}
        		}
        	},
        	items	: [{
        		xtype 	: 'button',
        		text	: '7'
        	},{
        		xtype 	: 'button',
        		text	: '8'
        	},{
        		xtype 	: 'button',
        		text	: '9'
        	}]
        },{
        	height	: (window.innerHeight - 44) * 0.16,
        	defaults: {
        		flex	: 1,
        		cls : 'keypadButtonNumber',
        		listeners : {
        			tap : function(button) {
        				       				
        				button.getParent().getParent().fireEvent('key_up', button.getText());
        			}
        		}
        	},
        	items	: [{
        		xtype 	: 'button',
        		text	: '#'
        	},{
        		xtype 	: 'button',
        		text	: '0'
        	},{
        		xtype 	: 'button',
        		text	: '*'
        	}]
        },{
        	height	: (window.innerHeight - 44) * 0.18,
        	defaults: {
        		flex	: 1
        	},
        	items	: [{
        		xtype 	: 'button',
        		text	: '+',
        		cls : 'keypadButtonAction',
        		listeners : {
        			tap : function(button) {
        				       				
        				button.getParent().getParent().fireEvent('key_up', button.getText());
        			}
        		}
        	},{
        		xtype 	: 'button',
        		text	: 'Call',
        		cls : 'keypadCall',
        		listeners : {
        			tap : function(button) {
        				
        				button.getParent().getParent().fireEvent('call');
        			}
        		}
        	},{
        		xtype 	: 'button',
        		text	: '<',
        		cls : 'keypadButtonAction',
        		listeners : {
        			tap : function(button) {
        				
        				button.getParent().getParent().fireEvent('del');
        			}
        		}
        	}]
        }]
    }
});
