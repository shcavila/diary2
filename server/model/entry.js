var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var entrySchema = new Schema({
    title:{
        type: String,
        required:false
    },
    body: {
        type: String,
        required: true
    },
    img:{
       type:String,
       required:false
    },
    createdAt:{
        type: Date,
        default: new Date(),
        required: true
    },
    editedAt:{
        type: Date,
        required: false
    }

});
module.exports = mongoose.model('Entry', entrySchema);