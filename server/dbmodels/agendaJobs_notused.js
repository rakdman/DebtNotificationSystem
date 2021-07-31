const mongoose = require('mongoose')

const agendaJobs = new mongoose.Schema(
    {
        name: String,
        type: String,
        data : String,
        endDate : Date,
        lastModifiedBy : String,
        nextRunAt: Date,
        priority: Number,
        repeatInterval: String,
        repeatTimezone: String,
        skipDays: Number,
        startDate: Date,
        lockedAt: Date,
        lastRunAt: Date,
        lastFinishedAt: Date
    }
)

module.exports = mongoose.model('agendaJobs',agendaJobs)
