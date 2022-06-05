const mongoose = require("mongoose");
const express = require("express");
const app = express();
const axios = require("axios");

// const sendemailfunction = require('./sendemailfunction')
const instancemodel = require("../dbmodels/instancemodel");
const processinstancemodel = require("../dbmodels/processinstancemodel");
const { create } = require("../dbmodels/instancemodel");

mongoose
  .connect(
    "mongodb+srv://sysadm:sysadm@cluster0.rcdk5.mongodb.net/bmsdb?retryWrites=true&w=majority"
  )
  .then(() => {
    // app.listen(9091);
    console.log("DB connected!");
    // console.log('Listening to port 9090....');
  })
  .catch((err) => {
    console.log("DB Connection failed!");
  });

async function filterallinstances() {
  const instancedata = await instancemodel.find().exec();
  // console.log(instancedata)

  instancedata.map((item) => {
    //  console.log('????????????????????????????????????????????????????????????????????????')
    // console.log(item.openAmount > 0 && item.instanceStatus == "in-progress")
    if (item.openAmount > 0 && item.instanceStatus == "in-progress") {
      item.wfsteps.map((subitem) => {
        // console.log(item.billId +'   ' + item.openAmount)

        if (
          subitem.sstatus == "pending" &&
          subitem.sscheduledDateTime <= new Date()
        ) {
          //    if (true)
          var subitemstatus;

          // console.log(...subitem.sName,item.billId)

          var messag =
            "Dear Customer,\n" +
            subitem.sName +
            "\n\nDetails:\nBill ID:" +
            item.billId +
            "\nOpen Bill Amount:" +
            item.openAmount;
          // console.log(messag)
          // axios.post(`api/integration/sendemail`,{esubject:"Debt Bill Notification",ebody:subitem.sName,etoemail:item.emailID}).then( res => {
          axios
            .post(`api/integration/sendemail`, {
              esubject: "Debt Bill Notification",
              ebody: messag,
              etoemail: item.emailID,
            })
            .then((res) => {
              // console.log(res.data)
              if ((res.data = "Ok")) {
                subitemstatus = "success";
                var data = {
                  instance_id: item._id,
                  firstName: item.firstName,
                  lastName: item.lastName,
                  contactNo: item.contactNo,
                  emailID: item.emailID,
                  sName: subitem.sName,
                  sscheduledDateTime: subitem.sscheduledDateTime,
                  sstatus: subitemstatus,
                };
              } else {
                subitemstatus = "error";
                var data = {
                  instance_id: item._id,
                  firstName: item.firstName,
                  lastName: item.lastName,
                  contactNo: item.contactNo,
                  emailID: item.emailID,
                  sName: subitem.sName,
                  sscheduledDateTime: subitem.sscheduledDateTime,
                  sstatus: subitemstatus,
                };
              }
              async function savedata() {
                const createprocessinstance = new processinstancemodel(data);
                const saveresult = await createprocessinstance.save();
                // console.log('data saved')
              }
              savedata();

              // block to update the status in instancemodel collection

              axios.patch(`api/instances/updateinstance`, {
                id: item._id,
                subid: subitem._id,
                substatus: subitemstatus,
              });
            });
          // sendemailfunction.sendemail("Test email from batch jobs",subitem.sName,item.emailID)
        }
      });
    }
  });
}

filterallinstances();

exports.filterallinstances = filterallinstances;
