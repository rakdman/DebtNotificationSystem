const express= require('express');
const mongoose = require('mongoose');
const Agenda = require('agenda')


const app = express();




const mongoDbConnectoin = 'mongodb+srv://sysadm:sysadm@cluster0.rcdk5.mongodb.net/bmsdb?retryWrites=true&w=majority'
console.log('Entering into agenda connect')
const  agenda = new Agenda ({db: { address: mongoDbConnectoin}})
console.log('Agenda connected')
agenda.define("testBatch", async (job) => {
    console.log('Priting from the Agenda Schedule')
    const ddate = new Date()
    console.log(ddate)
})


async function abc () {
  await agenda.start();
  await agenda.every("1 minute", "testBatch");
}
abc()

console.log('Existed agenda')

mongoose
.connect('mongodb+srv://sysadm:sysadm@cluster0.rcdk5.mongodb.net/bmsdb?retryWrites=true&w=majority')
.then(()=>{
    app.listen(9090);
    console.log('DB connected!');
    console.log('Listening to port 9090....');

})
.catch(err=>{
    console.log('DB Connection failed!');
});
