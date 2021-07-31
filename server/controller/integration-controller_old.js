var nodemailer = require('nodemailer')
var jsonfile = require('jsonfile')
var date = require('date-and-time');
const workflowtemplatemodel = require('../dbmodels/workflowtemplatemodel');
// const Smstemplatemodel = require('../dbmodels/smstemplatemodel');
const instancemodel = require('../dbmodels/instancemodel');
const e = require('express');
const fs= require('fs')
const fsreaddir= require('fs/promises')

const sendemail =  async (req, res, next) => {


    const reqDataSubject = req.body.esubject
    const reqDataBody =req.body.ebody
    const reqDataTo =req.body.etoemail
    const reqDataFrom = 'DebtCollectionSystem'

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dhim.rakesh@gmail.com',
          pass: 'Thinkpositive@22'
        }
      });
    
      
    var mailOptions = {
        from: reqDataFrom,
        to: reqDataTo,
        subject: reqDataSubject,
        text: reqDataBody
      };
    
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          // console.log('Email sent: ' + info.response);
        }
      });

    // console.log('sendEmail API response');
    res.json("Ok").status(200);
}


const loadfile =  async (req, res, next) => {

  // const reqDataFilename = req.body.filename
  var reqDataFilename
  // var reqDataFilenameArray = []
  const reqDataFilePath = "DataFileInput\\" 


  

try {
  const files = await fsreaddir.readdir(reqDataFilePath);
  // for (const file of files)
  files.map(async(file)=> 
  { 
    reqDataFilename= file
    // console.log(reqDataFilename);

  
     

fs.readFile(reqDataFilename,async function(err, filedata)
  {
    if (err) throw err;
    console.log(reqDataFilename);
    var jsondata = await JSON.parse(filedata);
    

    jsondata.map((inputrecord) => 
    {

      if(inputrecord.wfName && inputrecord.firstName && inputrecord.lastName && inputrecord.contactNo && inputrecord.emailID) 
      {console.log('Valid Data') 
     
// start to update the data with schedule

       const wfName = inputrecord.wfName;
       var result
     
      async function readSteps(callback)
      { 
        result = await workflowtemplatemodel.find({wfname: wfName}).exec()
        callback(result)
      }

      readSteps(async ()=> {
        var sName
        var sscheduledDateTime= new Date()
        var sexecutionDateTime
        var entrydate= new Date()
        
        var array_iwfsteps = []

        result.map((item)=>{(item.wfsteps).map((step)=>{
          sName = step.NName
          sscheduledDateTime = date.addDays(sscheduledDateTime,step.NWait)
          const sitem = {'sName': sName, 'sscheduledDateTime': sscheduledDateTime,  'sstatus': 'pending', 'sexecutionDateTime' : sexecutionDateTime  }
          array_iwfsteps.push(sitem)
        }
        )
      
        var item = {'firstName':inputrecord.firstName, 'lastName':inputrecord.lastName,contactNo:inputrecord.contactNo, emailID:inputrecord.emailID,
        'wfId': null, 'wfname':wfName,  'wfsteps': array_iwfsteps, 'instanceStatus' : 'in-progress', 'entrydate': entrydate }

        console.log(item) 
        const createinstancedata = new instancemodel(item);
        async function saveData()
        {const resultoutput = await createinstancedata.save();}
        saveData()
      })

      })

      }
      else
      console.log('In-Valid Data')

    })
  }
    )

// start of for loop of files
})
} catch (err) {
  console.error('This error is from outside'+err);
}

// end of for loop of files

  console.log('Load File API response');
  res.json("LoadFile API executed successfully");
}


exports.sendemail=sendemail;
exports.loadfile=loadfile;
