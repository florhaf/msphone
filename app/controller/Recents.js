Ext.define('MSPhone.controller.Recents', {
	extend : 'Ext.app.Controller',
	
	requires : ['Ext.Anim'],
	
	_isEditModeOn 		: false,
	_arrayDeleteIconOn	: [],
	_arrayDeleteBtnOn	: [],
	_arrayToDelete		: [],
	
	config : {
		refs : {
			view : 'recents'
		},
		control : {
			view : {
				clear	: 'clear_onTap',
				edit	: 'edit_onTap',
				itemtap : 'item_onTap'
			}
		}
	},
	
	init : function() {
		
		this.getApplication().on('call', this.addRecent, this);
	},
	
	addRecent : function(number) {
		
		var store = this.getView().getStore();
		var record = store.findRecord('number', number, 0, false, false, true);
		
		if (record != null) {
			
			record.set('timestamp', new Date().getTime());
			record.set('times_called', record.get('times_called') + 1);
		} else {
			
			record = Ext.create('MSPhone.model.Recent', {
				number : number,
				timestamp : +new Date(),
				times_called : 1
			});
			
			store.add(record);
		}
		
		store.sort('timestamp', 'DESC');
		
		store.sync();
	},
	
    reset 			: function() {

		if (this._isEditModeOn) {

			this.edit_onTap();
		}
	},
    
    // TAP HANDLERS
	clear_onTap 	: function() {

		this.getView().getStore().removeAll();
		this.getView().getStore().getProxy().clear();
	},
	edit_onTap 		: function() {

		this._slide();

		// wait for anim to finish sliding back into place
		// then delete from store
		if (this._isEditModeOn) {

			var me = this;

			setTimeout(function() {

				me._deleteRecents();
			}, 500);
		}

		this._isEditModeOn = !this._isEditModeOn;
	},
	item_onTap 		: function(list, index, item, record, ev, options) {

		// go to keypad
		if(!this._isEditModeOn) {

			// load number into keypad
		} else {
		// toggle the delete btn
			
			if (ev.target.className.indexOf('x-button') != -1) {
				
				this.delete_onTap(item, record);
			} else {
			
				var delIconHTML = item.dom.children[0].children[0].children[0].children[0].children[0].children[0].children[0];
				var delIconEl 	= Ext.get(delIconHTML);

				var delBtnHTML	= item.dom.children[0].children[0].children[0].children[0].children[0].children[2].children[0];
				var delBtnEl	= Ext.get(delBtnHTML);

				this._rotate(delIconEl);
				this._scale(delBtnEl);
			}
			
		}
	},
	delete_onTap 	: function(item, record) {

		var rowEl = Ext.get(item);

		var anim = new Ext.Anim({
			rowEl		: rowEl,
			easing 		: 'easeIn',
			autoClear 	: false,
			duration 	: 400,
			to 			: {
				'opacity': '0'
			}
		});

		anim.run(rowEl, {
			after : this._hideItem
		});

		this._arrayToDelete.push(record);
	},

    // GFX
	_rotate 		: function(el) {

		var index 		= this._arrayDeleteIconOn.indexOf(el.id);
		var angle 		= null;

		if (index == -1) {

			angle = -90;
			this._arrayDeleteIconOn.push(el.id);
		} else {

			angle = 0;
			this._arrayDeleteIconOn.splice(index, 1);
		}

		var anim = new Ext.Anim({
			duration 	: 400,
			autoClear	: false,
			from		: {
				'-webkit-transform-origin': '50% 50%'
			},
			to			: {
				'-webkit-transform': 'rotateZ(' + angle + 'deg)'
			}
		});

		anim.run(el);
		
	},
	_scale 			: function(el) {

		var index 		= this._arrayDeleteBtnOn.indexOf(el.id);
		var scale 		= null;

		if (index == -1) {

			scale = 1;
			this._arrayDeleteBtnOn.push(el.id);
		} else {

			scale = 0;
			this._arrayDeleteBtnOn.splice(index, 1);
		}

		var anim = new Ext.Anim({
			duration 	: 400,
			autoClear	: false,
			from		: {
				'-webkit-transform-origin': '100% 0%'
			},
			to			: {
				'-webkit-transform': 'scaleX(' + scale + ')'
			}
		});

		anim.run(el);
	},
	_slide			: function() {

		var list 	= this.getView();
		var left 	= this._toggleToolbarMode();


		// list edit mode toggle
		var anim = new Ext.Anim({
			easing 		: 'easeIn',
			autoClear 	: false,
			duration 	: 400,
			to 			: {
				'-webkit-transform': 'translateX(' + left + 'px)'
			}
		});

		var nodes = list.element.dom.childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[2].childNodes;

		for (var i = 0; i < nodes.length; i++) {

			var item = Ext.get(nodes[i].childNodes[0].childNodes[0]);
			
			anim.run(item);
			
		}
	},

	// RESET
	_resetDelIcons 	: function() {

		for (var i = 0; i < this._arrayDeleteIconOn.length; i++) {

			var delIconEl = Ext.get(this._arrayDeleteIconOn[i]);

			if (!Ext.isEmpty(delIconEl)) {

				Ext.DomHelper.applyStyles(delIconEl, '-webkit-transform: rotateZ(0deg);');
			}
		}

		this._arrayDeleteIconOn = [];
	},
	_resetDelButtons: function() {

		var delBtnAnim = new Ext.Anim({
			duration 	: 400,
			autoClear	: false,
			from		: {
				'-webkit-transform-origin': '100% 0%'
			},
			to			: {
				'-webkit-transform': 'scaleX(0)'
			}
		});

		for (var i = 0; i < this._arrayDeleteBtnOn.length; i++) {

			var delBtnEl = Ext.get(this._arrayDeleteBtnOn[i]);

			if (!Ext.isEmpty(delBtnEl)) {

				delBtnAnim.run(delBtnEl);
			}
		}

		this._arrayDeleteBtnOn	= [];
	},

	// DELETE
	_deleteRecents 	: function() {
        
		this.getView().getStore().remove(this._arrayToDelete);
		this.getView().getStore().sync();

        

		this._arrayToDelete = [];
	},
	_hideItem 		: function() {

		this.config.rowEl.hide();
	},

	// TOOLBAR
	_toggleToolbarMode		: function() {

		var left = 0;

		if(!this._isEditModeOn) {

			left = 45;
			this.getView().items.items[0].items.items[0].setText('Done');
			this.getView().items.items[0].items.items[2].setDisabled(true);
			this._resetDelIcons();
		} else {

			left = 0;
			this.getView().items.items[0].items.items[0].setText('Edit');
			this.getView().items.items[0].items.items[2].setDisabled(false);
			this._resetDelButtons();
		}

		return left;
	},

	// HELPERS
	_getTopVisibleIndex		: function(offset) {

		return Math.floor(offset.y / 64);
	}
});