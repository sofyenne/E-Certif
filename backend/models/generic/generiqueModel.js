module.exports.dateUpdateDateCreated = function dateUpdateDateCreated(schema) {

    schema.pre('updateOne', function (next) {
        this._update.update_date = new Date()
        next()
    });
    schema.pre('findOneAndUpdate', function (next) {
        this._update.update_date = new Date()
        next()
    });

    schema.pre('save', function (next) {
        this.update_date = new Date()
        next();
    });

    schema.post('save', function () {
        this.create_date = this._id.getTimestamp()
 
    });

    schema.post('find', function (result) {
        if (result) {
            result.filter(doc => { doc.create_date = doc._id.getTimestamp() });
        }
    });

}


