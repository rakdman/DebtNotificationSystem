var nodemailer = require("nodemailer");
var jsonfile = require("jsonfile");
var date = require("date-and-time");
const workflowtemplatemodel = require("../dbmodels/workflowtemplatemodel");
const instancemodel = require("../dbmodels/instancemodel");
const e = require("express");
const fs = require("fs");
const fsreaddir = require("fs/promises");
const Agenda = require("agenda");

const sendemail = async (req, res, next) => {
  const reqDataSubject = req.body.esubject;
  const reqDataBody = req.body.ebody;
  const reqDataTo = req.body.etoemail;
  const reqDataFrom = "DebtCollectionSystem";

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dhim.rakesh@gmail.com",
      pass: "Thinkpositive@22",
    },
  });

  var mailOptions = {
    from: reqDataFrom,
    to: reqDataTo,
    subject: reqDataSubject,
    text: reqDataBody,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      // console.log('Email sent: ' + info.response);
    }
  });

  // console.log('sendEmail API response');
  res.json("Ok").status(200);
};

const loadfile = async (req, res, next) => {
  // const reqDataFilename = req.body.filename
  var reqDataFilename;
  // reqDataFilename=req.body.filename
  // console.log(reqDataFilename.indexOf('fakepath123'))
  // if (reqDataFilename && reqDataFilename.indexOf('fakepath123') > -1 )
  // {

  // }

  // var a = reqDataFilename.indexOf('fakepath')+9
  // console.log('a:'+a )
  // const b = reqDataFilename.substring(a,)
  // console.log('b:'+b)
  // var reqDataFilenameArray = []
  // const reqDataFilePath = "DataFileInput//";
  const { dirname } = require("path");
  const reqDataFilePath = dirname(require.main.filename);
  //   console.log(req)
  // if(req.query.jobname) {
  //   console.log(' Input file name is : ')
  //   console.log(req.query.jobname)
  // }
  console.log("BASED Directory:" + reqDataFilePath);

  try {
    console.log("Entered in the try block 1");

    fs.readdir(reqDataFilePath + "/DataFileInput/", (err, files) => {
      if (err) console.log(err);
      else {
        console.log("\nCurrent directory filenames:");
        files.forEach((file) => {
          // reqDataFilename="C:/Data/Fulda/Summer_Semester2021/1. SDP/server/DataFileInput/"+file
          console.log("FILEEEEEEEEEEEEEEEEEEEEEE:" + file);
          reqDataFilename = reqDataFilePath + "/DataFileInput/" + file;
          // reqDataFilename=file
          console.log(reqDataFilename);
          if (file) {
            fs.readFile(file, async function (err, filedata) {
              console.log(file);
              if (err)
                console.log(
                  "There is error ############################" + err
                );
              console.log(file);
              var jsondata = await JSON.parse(filedata);

              jsondata.map((inputrecord) => {
                if (
                  inputrecord.wfName &&
                  inputrecord.firstName &&
                  inputrecord.lastName &&
                  inputrecord.contactNo &&
                  inputrecord.emailID &&
                  inputrecord.billId &&
                  inputrecord.openAmount
                ) {
                  console.log("Valid Data");
                  // console.log(inputrecord)

                  // start to update the data with schedule

                  const wfName = inputrecord.wfName;
                  var result;

                  async function readSteps(callback) {
                    result = await workflowtemplatemodel
                      .find({ wfname: wfName })
                      .exec();
                    console.log("result:");
                    console.log(result);
                    callback(result);
                    if (result.length < 1)
                      console.log(
                        "Workflow name in the input file may not be correct!"
                      );
                  }

                  readSteps(async () => {
                    console.log(await result);
                    var sName;
                    var sscheduledDateTime = new Date();
                    var sexecutionDateTime;
                    var entrydate = new Date();

                    var array_iwfsteps = [];

                    result.map((item) => {
                      item.wfsteps.map((step) => {
                        sName = step.NName;
                        sscheduledDateTime = date.addDays(
                          sscheduledDateTime,
                          step.NWait
                        );
                        const sitem = {
                          sName: sName,
                          sscheduledDateTime: sscheduledDateTime,
                          sstatus: "pending",
                          sexecutionDateTime: sexecutionDateTime,
                        };
                        array_iwfsteps.push(sitem);

                        // console.log(array_iwfsteps)
                      });

                      var item = {
                        firstName: inputrecord.firstName,
                        lastName: inputrecord.lastName,
                        contactNo: inputrecord.contactNo,
                        emailID: inputrecord.emailID,
                        billId: inputrecord.billId,
                        openAmount: inputrecord.openAmount,
                        wfId: null,
                        wfname: wfName,
                        wfsteps: array_iwfsteps,
                        instanceStatus: "in-progress",
                        entrydate: entrydate,
                      };

                      //  console.log(item)
                      const createinstancedata = new instancemodel(item);
                      async function saveData() {
                        const resultoutput = await createinstancedata.save();
                      }
                      saveData();
                    });
                  });
                } else console.log("In-Valid Data");
              });
            });
          }

          // start of for loop of files

          console.log(
            "FILE TO BE DELETED ******************:" + reqDataFilename
          );
          if (file && file != "/app/DataFileInput/") {
            fs.unlinkSync(file);
          }
        });
        console.log("Load File API response");
        res.json({ DataLoaded: "DataLoaded" });
      }
    });

    // const files = await fsreaddir.readdir(reqDataFilePath + "/DataFileInput/");
    // console.log("Entered in the try block 2");
    // for (const file of files)

    // console.log("§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§")
    // console.log(files.length);

    // if (files.length > 0) {
    //   files.map(async (file) => {});

    // }
  } catch (err) {
    console.error("This error is from outside" + err);
    res.json({ DataLoaded: "NoDataLoaded" });
  }

  // end of for loop of files

  // console.log("Load File API response");
  // res.json({ DataLoaded: "DataLoaded" });
  // res.send('LoadFile API executed successfully');
  // res.status(200)
};

const readloadschedule = async (req, res, next) => {
  console.log("From readloadschedule api");
  console.log(req.query.jobname);
  var jobname = req.query.jobname;
  const mongoDbConnectoin =
    "mongodb+srv://sysadm:sysadm@cluster0.rcdk5.mongodb.net/bmsdb?retryWrites=true&w=majority";
  console.log("Entering into agenda connect");
  const agenda = new Agenda({ db: { address: mongoDbConnectoin } });
  console.log("Agenda connected");

  await agenda.start();
  const jobs = await agenda.jobs({ name: jobname });
  // const jobs = await agenda.jobs();

  console.log(jobs);
  console.log("Agenda Jobs search finished");

  res.json(jobs);
};

///////////////////////////////////////////////////////////////////////////////

const loadPaymentfile = async (req, res, next) => {
  var reqDataFilename;
  const reqDataFilePath = "PaymentFileInput\\";
  console.log(reqDataFilePath);

  try {
    const files = await fsreaddir.readdir(reqDataFilePath);

    files.map(async (file) => {
      reqDataFilename =
        "C:/Data/Fulda/Summer_Semester2021/1. SDP/server/PaymentFileInput/" +
        file;

      console.log(reqDataFilename);

      fs.readFile(reqDataFilename, async function (err, filedata) {
        console.log(reqDataFilename);
        if (err)
          console.log("There is error ############################" + err);
        console.log(reqDataFilename);
        var jsondata = await JSON.parse(filedata);

        jsondata.map(async (inputrecord) => {
          if (inputrecord.billId && inputrecord.paymentAmount) {
            console.log("Valid Data");

            // Updating the openAmount with paymentAmount received for each payment record
            await instancemodel
              .find({ billId: inputrecord.billId })
              .exec()
              .then(async (item) => {
                item[0].openAmount =
                  item[0].openAmount - inputrecord.paymentAmount;
                var result = await item[0].save();
                // console.log(item[0].openAmount)
                if (
                  item[0].openAmount <= 0 &&
                  item[0].instanceStatus === "in-progress"
                ) {
                  item[0].instanceStatus = "ended";
                  var result = await item[0].save();

                  var arr_wfsteps = result.wfsteps;

                  for (var i = 0; i < arr_wfsteps.length; i++) {
                    if (arr_wfsteps[i].sstatus === "pending") {
                      // console.log(arr_wfsteps[i].sstatus)
                      arr_wfsteps[i].sstatus = "ended";
                      // console.log(arr_wfsteps[i].sstatus)
                      item[0].wfsteps = arr_wfsteps;
                      const output = await item[0].save();
                    }
                  }

                  // if(result[i].wfsteps.sstatus === "pending")
                  // {
                  //   item[0].wfsteps.sstatus = "ended"
                  //   result= await item[0].save()}
                  // else
                  // {console.log('nothing happended')}
                }
              });
          } else console.log("In-Valid Data");
        });
      });

      // start of for loop of files

      console.log(reqDataFilename);
      fs.unlinkSync(reqDataFilename);
    });
  } catch (err) {
    console.error("This error is from outside" + err);
  }

  // end of for loop of files

  console.log("Load File API response");
  res.json("LoadPaymentFile API executed successfully");
};

exports.sendemail = sendemail;
exports.loadfile = loadfile;
exports.readloadschedule = readloadschedule;
exports.loadPaymentfile = loadPaymentfile;
