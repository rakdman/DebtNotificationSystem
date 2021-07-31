const mangoose = require('mongoose');

const smstemplate = new mangoose.Schema (
    {
        tname : {type:String, required:true},
        text : {type:String, required:true }
    }
);

module.exports = mangoose.model('Smstemplate',smstemplate);