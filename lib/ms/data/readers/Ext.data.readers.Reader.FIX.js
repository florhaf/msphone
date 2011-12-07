Ext.override(Ext.data.Reader, {

    /**
     * Reads the given response object. This method normalizes the different types of response object that may be passed
     * to it, before handing off the reading of records to the {@link readRecords} function.
     * @param {Object} response The response object. This may be either an XMLHttpRequest object or a plain JS object
     * @return {Ext.data.ResultSet} The parsed ResultSet object
     */
    read: function(response) {
        var data = response;

        //Temporary workaround for \' seen in data
        // will remove all combination of \ before '

        if(response.responseText)
        {
            response.responseText = response.responseText.replace(/\\*\'/,"'");
        }

        if (response && response.responseText) {
            try {
                data = this.getResponseData(response);
            } catch(e) {
                this.nullResultSet.success = false;
                return this.nullResultSet;
            }
        }
        
        if (data) {
            return this.readRecords(data);
        } else {
            return this.nullResultSet;
        }
    },

    /**
     * Abstracts common functionality used by all Reader subclasses. Each subclass is expected to call
     * this function before running its own logic and returning the Ext.data.ResultSet instance. For most
     * Readers additional processing should not be needed.
     * @param {Mixed} data The raw data object
     * @return {Ext.data.ResultSet} A ResultSet object
     */
    readRecords: function(data) {
        /**
         * The raw data object that was last passed to readRecords. Stored for further processing if needed
         * @property rawData
         * @type Mixed
         */
        var total = 0,
        success,
        value, records, recordCount;
         
        this.rawData = data;

        data = this.getData(data);

        var root    = this.getRoot(data);
        if(root) {
            total   = root.length;
            success = true;
        } else {
            success = false;
        }

        if (this.totalProperty) {
            value = parseInt(this.getTotal(data), 10);
            if (!isNaN(value)) {
                total = value;
            }
        }

        if (this.successProperty) {
            value = this.getSuccess(data);
            if (value === false || value === 'false') {
                success = false;
            }
        }

        records = (root)?this.extractData(root, true):[];
        recordCount = records.length;

        return new Ext.data.ResultSet({
            total  : total || recordCount,
            count  : recordCount,
            records: records,
            success: success
        });
    }
    
});