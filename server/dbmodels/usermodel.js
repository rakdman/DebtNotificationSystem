const mongoose = require('mongoose');

const usertemplate = new mongoose.Schema (
    {
        username : {type:String, required:true},
        password : {type:String, required:true },
        email : {type:String},
        role: {type:String}, // 0 for normal user, 1 for administrator
        firstname: {type:String},
        lastname: {type:String},
        approved:{type:Boolean}
    }
);

module.exports = mongoose.model('User',usertemplate);