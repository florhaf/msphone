MSPhone.controllers.AbstractEditableList = {

    _isEditModeOn 		: false,
	_arrayDeleteIconOn	: [],
	_arrayDeleteBtnOn	: [],
	_arrayToDelete		: [],
    _list               : null,

    reset 			: function() {

		if (this._isEditModeOn) {

			this.edit_onTap();
		}
	},
    
    // TAP HANDLERS
	clear_onTap 	: function() {

		this._store.removeAll();
		this._store.getProxy().clear();
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
	item_onTap 		: function(routeData) {

		var recent	= routeData.recent;
		var item 	= routeData.item;

		// go to keypad
		if(!this._isEditModeOn) {

			Ext.dispatch({
				controller 	: 'keypad',
				action 		: 'loadRecentNumber',
				recent	 	: recent
			});
		} else {
		// toggle the delete btn

			var delIconHTML = item.children[0].children[0].children[0].children[0].children[0].children[0].children[0];
			var delIconEl 	= Ext.get(delIconHTML);

			var delBtnHTML	= item.children[0].children[0].children[0].children[0].children[0].children[2].children[0];
			var delBtnEl	= Ext.get(delBtnHTML);

			this._rotate(delIconEl);
			this._scale(delBtnEl);
		}
	},
	delete_onTap 	: function(routeData) {

		var rowEl = Ext.get(routeData.item);

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

		this._arrayToDelete.push(routeData.record);
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

		var list 	= (this._list == null) ? this._view.items.items[0] : this._list;
		var nodes 	= list.getNodes();
		var left 	= this._toggleToolbarMode();

		var offset 	= (this._list != null) ?
                this._view.items.items[0].scroller.getOffset() :
                list.scroller.getOffset();
		var index 	= this._getTopVisibleIndex(offset);

		// list edit mode toggle
		var anim = new Ext.Anim({
			easing 		: 'easeIn',
			autoClear 	: false,
			duration 	: 400,
			to 			: {
				'-webkit-transform': 'translateX(' + left + 'px)'
			}
		});

		for(var i = 0; i < nodes.length; i++) {

			var body 	= Ext.get(nodes[i].children[0].children[0]);
			var discl 	= Ext.get(nodes[i].children[1]);

			// animate only visible rows
			// performance trick
			if (i >= index && i <= index + 10) {

				anim.run(body);
				anim.run(discl);
			} else {

				Ext.DomHelper.applyStyles(body, '-webkit-transform: translateX(' + left + 'px);');
				Ext.DomHelper.applyStyles(discl, '-webkit-transform: translateX(' + left + 'px);');
			}
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
        
		this._store.remove(this._arrayToDelete);
		this._store.sync();

        this._syncStoreRemote();

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
			this._view.dockedItems.items[0].items.items[0].setText('Done');
			this._view.dockedItems.items[0].items.items[2].setDisabled(true);
			this._resetDelIcons();
		} else {

			left = 0;
			this._view.dockedItems.items[0].items.items[0].setText('Edit');
			this._view.dockedItems.items[0].items.items[2].setDisabled(false);
			this._resetDelButtons();
		}

		return left;
	},

	// HELPERS
	_getTopVisibleIndex		: function(offset) {

		return Math.floor(offset.y / 64);
	}
};