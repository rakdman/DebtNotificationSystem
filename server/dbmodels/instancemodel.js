const mangoose = require('mongoose');


const instancemodel = new mangoose.Schema (
    {
        firstName : String,
        lastName : String,
        contactNo : String,
        emailID : String,  
        wfId : String,  
        wfname : String,
        wfsteps : [ {sName:String, sscheduledDateTime : Date, sstatus: String, sexecutionDateTime: Date} ],
        instanceStatus : String,
        allowedRoles : String,
        entrydate : Date,
        billId: String,
        openAmount : Number
    }
);

module.exports = mangoose.model('instancemodel',instancemodel);