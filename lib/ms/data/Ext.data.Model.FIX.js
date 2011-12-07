Ext.apply(Ext.data.Model, {
    /**
     * <b>Static</b>. Asynchronously loads a model instance by id. Sample usage:
<pre><code>
MyApp.User = Ext.regModel('User', {
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'}
    ]
});

MyApp.User.load(10, {
    scope: this,
    failure: function(record, operation) {
        //do something if the load failed
    },
    success: function(record, operation) {
        //do something if the load succeeded
    },
    callback: function(record, operation) {
        //do something whether the load succeeded or failed
    }
});
</code></pre>
     * @param {Number} id The id of the model to load
     * @param {Object} config Optional config object containing success, failure and callback functions, plus optional scope
     * @member Ext.data.Model
     * @method load
     * @static
     */
    load: function(id, config) {
        config = Ext.applyIf(config || {}, {
            action: 'read',
            id    : id
        });
        
        var operation  = new Ext.data.Operation(config),
            callbackFn = config.callback,
            successFn  = config.success,
            failureFn  = config.failure,
            scope      = config.scope,
            record, callback;
        
/** NOTE: callback will fail if bad URL, because operation.getRecords() won't work if there's a failure! **/
        callback = function(operation) {
            var recs = operation.getRecords();
            if(recs && Ext.isArray(recs)) {
                if(recs.length > 0) {
                    record = recs[0];
                } else {
                    record = null;
                }
            } else {
                record = null;
            }
            
            if (operation.wasSuccessful()) {
                if (typeof successFn == 'function') {
                    successFn.call(scope, record, operation);
                }
            } else {
                if (typeof failureFn == 'function') {
                    failureFn.call(scope, record, operation);
                }
            }
            
            if (typeof callbackFn == 'function') {
                callbackFn.call(scope, record, operation);
            }
        };
       
       //MAT: Return was not part of the original code; we need it so that we can cancel AJAX events
       return this.proxy.read(operation, callback, this);
    }
});
