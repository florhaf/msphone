/**
 * @class Ext.data.Connection
 * @extends Ext.util.Observable
 */
Ext.override(Ext.data.Connection, {
    /**
     * Aborts any outstanding request.
     * @param {Object} request (Optional) defaults to the last request
     */
    abort : function(r) {
        if (r && this.isLoading(r)) {
            if (!r.timedout) {
                r.aborted = true;
            }
            // Will fire an onreadystatechange event
            r.xhr.abort();
        }
        else if (!r) {
            var id;
            for(id in this.requests) {
                if (!this.requests.hasOwnProperty(id)) {
                    continue;
                }
                this.abort(this.requests[id]);
            }
        }
    }
});