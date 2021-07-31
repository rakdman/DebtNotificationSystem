const mongoose = require('mongoose');

const Smstemplate =require('./dbmodels/smstemplatemodel');

mongoose
.connect('mongodb+srv://sysadm:sysadm@cluster0.rcdk5.mongodb.net/bmsdb?retryWrites=true&w=majority')
.then(()=>{
    console.log('DB connected!');
})
.catch(err=>{
    console.log('DB Connection failed!');
});


const createTemplate = async (req, res, next) => {
    const CreatedTemplate = new Smstemplate(
        {
            tname: req.body.tname,
            text: req.body.text
        }
    );

    const result = await CreatedTemplate.save();
    console.log(typeof CreatedTemplate.id);
    res.json(result);
};

exports.createTemplate = createTemplate;

const getAllTemplates = async (req, res, next) => {

    const smsTemplate = await Smstemplate.find().exec();
    
    res.json(smsTemplate);
}

exports.getAllTemplates = getAllTemplates;

