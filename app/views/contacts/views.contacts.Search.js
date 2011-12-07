Ext.namespace('MSPhone.views.contacts');

MSPhone.views.contacts.Search = Ext.extend(Ext.Panel, {

	initComponent : function() {

		Ext.apply(this, {

			layout 	: {
				type	: 'vbox'
			},
			width	: '100%',
			scroll	: 'vertical',
			items 	: [{
				xtype	: 'toolbar',
				width	: '100%',
				ui		: 'light',
				items	: [{
					xtype			: 'searchfield',
					width			: '95%',
					ui		 		: 'dark',
					autoComplete 	: true,
					autoDestroy		: true,
					useClearIcon	: false,
					placeHolder		: 'Search the firmwide directory',
					listeners		: {
						scope			: this,
						keyup 			: function(el, ev) {
							
							var searchValue	= el.getValue();
							var isEnterKey 	= (ev.browserEvent.keyCode == 13);
							var isDelKey 	= (ev.browserEvent.keyCode == 8);
	
							Ext.dispatch({
								controller 	: 'contacts',
								action 		: 'search',
								searchValue	: searchValue,
								isEnterKey	: isEnterKey,
								isDelKey	: isDelKey,
								searchBox 	: el
							});
						}
					}
				}]
			}],
			scope		: this,
			listeners 	: {
				afterrender 	: function(panel) {
					
					this.getEl().addListener('tap', this.onTap, this);
					
					Ext.dispatch({
						controller	: 'contacts',
						action		: 'hideSearchBar',
						panel		: panel
					});
				}
			},
            onTap : function(ev, el) {
                if(Ext.fly(el).hasCls('x-field-clear')) {
					
					Ext.dispatch({
						controller 	: 'contacts',
						action 		: 'search',
						searchValue	: '',
						isEnterKey	: false,
						isDelKey	: false,
						searchBox 	: el
					});
				}
			}
		});

		MSPhone.views.contacts.Search.superclass.initComponent.call(this);
	}
});

Ext.reg('contacts_search', MSPhone.views.contacts.Search);
