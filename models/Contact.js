var mongoose = require('mongoose');

//structure database content
var ContactSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email:{
        type: String
    },
    number: {
        type: String
    },
    data:{
        type: Date,
        default: Date.now
    }
});

module.exports = Contact = mongoose.model('contact', ContactSchema);