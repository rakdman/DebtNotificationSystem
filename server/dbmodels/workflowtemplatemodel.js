const mangoose = require('mongoose');


const workflowtemplatemodel = new mangoose.Schema (
    {
        wfname : String,
        wfsteps : [ {NWait: Number, NName:String} ]
    }
);

module.exports = mangoose.model('workflowtemplatemodel',workflowtemplatemodel);