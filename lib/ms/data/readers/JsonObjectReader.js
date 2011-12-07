/**
* We need the JSON Object Reader because Sencha doesn't like non-array objects
* returned. So, when a non-array root is specified (which it should be for a model load),
* we use this reader to wrap that root in an array (if it is not already an array).
* @class MSSB.data.JsonObjectReader
*/
Ext.ns('MSSB.data');
MSSB.data.JsonObjectReader = Ext.extend(Ext.data.JsonReader, {
		
	readRecords: function(data) {
		
		if (data[this.root]) {			
			if (!(data[this.root] instanceof Array)) {
				data[this.root] = [data[this.root]];
			}
		}
		
        return MSSB.data.JsonObjectReader.superclass.readRecords.call(this, data);
    }
});
Ext.data.ReaderMgr.registerType('json-object', MSSB.data.JsonObjectReader);