const mangoose = require('mongoose');


const processinstancemodel = new mangoose.Schema (
    {
        instance_id: String,
        firstName : String,
        lastName : String,
        contactNo : String,
        emailID : String,  
        sName:String,
        sscheduledDateTime : Date,
        sstatus: String
        // sexecutionDateTime: Date,
        // instanceStatus : String,
        // allowedRoles : String,
        // entrydate : Date
    }
);

module.exports = mangoose.model('processinstancemodel',processinstancemodel);