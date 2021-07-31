const Agenda = require('agenda')


const mongoDbConnectoin = "mongodb+srv://sysadm:sysadm@cluster0.rcdk5.mongodb.net/bmsdb?retryWrites=true&w=majority"

const  agenda = new Agenda ({db: { address: mongoDbConnectoin}})

agenda.define("testBatch", async (job) => {
    console.log('Priting from the Agenda Schedule')
})

async function abc () {
    // await agenda.start()
    // await agenda.every("1 minutes", "testBatch")
}
abc()

