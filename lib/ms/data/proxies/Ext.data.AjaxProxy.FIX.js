Ext.override(Ext.data.AjaxProxy, {

	// from florian:
	// remove the limit paramter from the request
	// which causes the service to fail param validation
	limitParam : undefined,

    createRequestCallback: function(request, operation, callback, scope) {
        var me = this;
        return function(options, success, response) {
            
            //MAT: making a change here to capture the undefined record error (500)
/*            if (operation != undefined  && operation.getRecords() == undefined && operation.getError() != undefined) {
                success = false;
            }
*/
            if (success === true) {
                var reader  = me.getReader(),
                    result  = reader.read(response);
                    success = result.success;
            }
            
            if(success === true) {

                //+ Tech debt.. its 9:30 on sunday the day before code complete
                //Need to create request / response chain model to handle these better
                //Ext.ControllerManager.get('Settings').setIdleTimers(new Date());

                var records = result.records,
                    length  = records.length,
                    mc      = new Ext.util.MixedCollection(true, function(r) {return r.getId();}),
                    record, i;
                
                mc.addAll(operation.records);
                for (i = 0; i < length; i++) {
                    record = mc.get(records[i].getId());
                    
                    if (record) {
                        record.set(record.data);
                    }
                }

                //see comment in buildRequest for why we include the response object here
                Ext.apply(operation, {
                    response : response,
                    resultSet: result
                });
                
                operation.setCompleted();
                operation.setSuccessful();
            } else {
    			operation.response = response;
                me.fireEvent('exception', this, response, operation);
                //TODO: extract error message from reader
                operation.setException();

            }
                        
            //this callback is the one that was passed to the 'read' or 'write' function above
            if (typeof callback == 'function') {
                callback.call(scope || me, operation);
            }
            
            me.afterRequest(request, true);
        };
    }
	
});