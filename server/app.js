const express = require("express");
const bodyParser = require("body-parser");
const templateRoutes = require("./routes/template-routes");
const userRoutes = require("./routes/user-routes");
const workflowRoutes = require("./routes/workflow-routes");
const instancesRoutes = require("./routes/instances-routes");
const integrationRoutes = require("./routes/integration-routes");
const mongoose = require("mongoose");

//for scheduling the email job
const Agenda = require("agenda");
const batchjob = require("./controller/batchjob"); //for sending email
const integrationController = require("./controller/integration-controller");

const https = require("https");
const fs = require("fs");
const { now } = require("agenda/dist/agenda/now");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/user", userRoutes);

app.use("/api/template", templateRoutes);

app.use("/api/workflow", workflowRoutes);

app.use("/api/instances", instancesRoutes);

app.use("/api/integration", integrationRoutes);

//app.post('/api/create',mongoosePractise.createTemplate);

//app.get('/api/read',mongoosePractise.getAllTemplates);

//Special Error handling middleware without path and four parameters.
// app.use((error,req, res, next)=>{
//     if(res.headerSent) {
//         return next(error);
//     }

//     res.status(error.code||500);
//     res.json({message: error.message || 'An error occurred'});

// });

// Start: This block will create connect to Agenda scheduler

const mongoDbConnectoin =
  "mongodb+srv://sysadm:sysadm@cluster0.rcdk5.mongodb.net/bmsdb?retryWrites=true&w=majority";
console.log("Entering into agenda connect");
const agenda = new Agenda({ db: { address: mongoDbConnectoin } });
console.log("Agenda connected");
agenda.define("sendEmailJob", async (job) => {
  console.log("Starting the sendemail batch job will run each minute");
  batchjob.filterallinstances();
  const ddate = new Date();
  console.log(ddate);
  // console.log('##################Job ends###################')
});
agenda.define("loadFileJob", async (job) => {
  console.log(
    "Starting the customer and payment file upload batch job as per schedule"
  );
  integrationController.loadfile();
  const ddate = new Date();
  console.log(ddate);
  console.log("##################Job ends###################");

  // integrationController.loadPaymentfile()
});

async function abc() {
  await agenda.start();
  await agenda.every("10 minutes", "sendEmailJob");
  await agenda.every("10 minutes", "loadFileJob");
}

abc();

// End: This block will create connect to Agenda scheduler

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

// This block will Connect to application datbase
mongoose
  .connect(
    "mongodb+srv://sysadm:sysadm@cluster0.rcdk5.mongodb.net/bmsdb?retryWrites=true&w=majority"
  )
  .then(() => {
    // app.listen(9090);
    app.listen(process.env.PORT || 9090);
    console.log("DB connected!");
    console.log("Listening to port 9090....");
  })
  .catch((err) => {
    console.log("DB Connection failed!");
  });

// mongoose
// .connect('mongodb+srv://sysadm:sysadm@cluster0.rcdk5.mongodb.net/bmsdb?retryWrites=true&w=majority')
// .then(()=>{
//   // https.createServer(options, function (req, res) {
//   //   res.writeHead(200);
//   //   res.end("Server running on 9090");
//   // }).listen(9090);

//   https.createServer(options).listen(9090);
//     // console.log('DB connected!');
//     // console.log('Listening to port 9090....');
// })
// .catch(err=>{
//     console.log('DB Connection failed!');
// });

// console.log('Server running on port 9090.....')

//app.use(bodyParser.json());

//app.use('/api/template/sms',templateRoutes);

//  app.get('/',(req,res) => {
//      res.send('Hello World');
//  });

//   app.post('/', (req,res) => {

//     tname=req.body.tname,
//     text=req.body.template_text

// //    const createdSMSTemplate = new Smstemplatemodel(
// //         tname=req.body.tname,
// //         text=req.body.template_text
// //     );

//     try{
//         createdSMSTemplate.save();
//     }catch(error){
//         console.log('Error while saving the model');
//     }

//     throw (error);
//     res.status(200).json('It is done');

//   });
