Ext.override(Ext.data.MemoryProxy, {
    
    /**
     * Reads data from the configured {@link #data} object. Uses the Proxy's {@link #reader}, if present
     * @param {Ext.data.Operation} operation The read Operation
     * @param {Function} callback The callback to call when reading has completed
     * @param {Object} scope The scope to call the callback function in
     */
    read: function(operation, callback, scope) {
        var reader = this.getReader(),
            result = reader.read(this.data);

//FIX: Must set operation.success to "true" (and, with a memory proxy, that makes good sense to just do)
//, otherwise the records it reads won't be returned to the store!
        Ext.apply(operation, {
             resultSet: result
            ,success: true
        });
        
        operation.setCompleted();
        
        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    }
    
});