const Smstemplatemodel = require('../dbmodels/smstemplatemodel');
const Emailtemplatemodel = require('../dbmodels/emailtemplatemodel');

//const  createSMSTemplate = (req,res)  => {
    // const {name, template_text} = req.body;

    // const createdSMSTemplate = new Smstemplatemodel(
    //     name=req.body.name,
    //     text=req.body.template_text
    // );

    // try{
    //     await createdSMSTemplate.save();
    // }catch(error){
    //     console.log('Error while saving the model');
    // }
    
    // throw (error);
    // res.status(200).json('It is done');

    // res.status(200).json('It is from API request');



//};

const readAllSMSTemplate =async (req, res, next) => 
{
    const smstemplate = await Smstemplatemodel.find().exec();

    const tname=await smstemplate.map(d => d.tname);
    const text=await smstemplate.map(d => d.text);


    console.log(tname);
    console.log(text);
    res.json(smstemplate);
    //res.json({message:'Response wit all SMS templates from controller'}).status(200);
}

const readOneSMSTemplate = async (req, res, next) => {
    const id = req.query.idd
    console.log('Idd from the URL:'+ id);
    const result = await Smstemplatemodel.findById({_id:id}).exec();
    res.json(result);
};

const readNameSMSTemplate = async (req, res, next) => {

    const name = req.params.tname;

    const result = await Smstemplatemodel.find({tname: name}).exec();

    res.json(result);

};

const createSMSTemplate = async (req, res, next) => {

    const reqTname = req.body.tname;
    const reqTtext = req.body.text;

    console.log('reqTname:'+reqTname);
    console.log('reqTtext:'+reqTtext);
    
    const createSMSTemplate = new Smstemplatemodel(
        {
            tname: reqTname,
            text: reqTtext
        }
    );

    try{
        const result = await createSMSTemplate.save();
    } catch (error)
    {
        console.log('Template creation failed:'+error);
    }
    
    console.log('Template creation sucessful');
    res.json("Success");
}

const updateTemplate = async (req, res, next) => {

    const id = req.body.idd;

    const tname = req.body.tname;
    const text = req.body.text;
    console.log(tname);
    console.log(text);

    const template = await Smstemplatemodel.findById(id).exec();
                           
    console.log(template);

    template.tname=tname;
    template.text=text;

    const result = await template.save();

    res.json(result);

};


const deleteTemplate =  async (req, res, next) => {

    const id = req.query.idd;

    const template = await Smstemplatemodel.findById(id).exec();

    const result = template.delete();

    res.json(result);

};


// EMAIL Related API DETAILS


const readAllEmailTemplate =async (req, res, next) => 
{
    const emailtemplate = await Emailtemplatemodel.find().exec();

    const tname=await emailtemplate.map(d => d.tname);
    const text=await emailtemplate.map(d => d.text);


    console.log(tname);
    console.log(text);
    res.json(emailtemplate);
    //res.json({message:'Response wit all Email templates from controller'}).status(200);
}

const readOneEmailTemplate = async (req, res, next) => {
    const id = req.query.idd
    console.log('Idd from the URL:'+ id);
    const result = await Emailtemplatemodel.findById({_id:id}).exec();
    res.json(result);
};

const readNameEmailTemplate = async (req, res, next) => {

    const name = req.params.tname;

    const result = await Emailtemplatemodel.find({tname: name}).exec();

    res.json(result);

};

const createEmailTemplate = async (req, res, next) => {

    const reqTname = req.body.tname;
    const reqTtext = req.body.text;

    console.log('reqTname:'+reqTname);
    console.log('reqTtext:'+reqTtext);
    
    const createEmailTemplate = new Emailtemplatemodel(
        {
            tname: reqTname,
            text: reqTtext
        }
    );

    try{
        const result = await createEmailTemplate.save();
    } catch (error)
    {
        console.log('Template creation failed:'+error);
    }
    
    console.log('Template creation sucessful');
    res.json("Success");
}

const updateemailTemplate = async (req, res, next) => {

    const id = req.body.idd;

    const tname = req.body.tname;
    const text = req.body.text;
    console.log(tname);
    console.log(text);

    const template = await Emailtemplatemodel.findById(id).exec();
                           
    console.log(template);

    template.tname=tname;
    template.text=text;

    const result = await template.save();

    res.json(result);

};


const deleteemailTemplate =  async (req, res, next) => {

    const id = req.query.idd;

    const template = await Emailtemplatemodel.findById(id).exec();

    const result = template.delete();

    res.json(result);

};



// SMS

//different way to export multiple functions
exports.readAllSMSTemplate=readAllSMSTemplate;
//exports.readOneSMSTemplate=readOneSMSTemplate;
exports.createSMSTemplate=createSMSTemplate;
exports.readOneSMSTemplate=readOneSMSTemplate;
exports.readNameSMSTemplate=readNameSMSTemplate;
exports.updateTemplate=updateTemplate;
exports.deleteTemplate=deleteTemplate;

// Email

exports.readAllEmailTemplate=readAllEmailTemplate;
exports.createEmailTemplate=createEmailTemplate;
exports.readOneEmailTemplate=readOneEmailTemplate;
exports.readNameEmailTemplate=readNameEmailTemplate;
exports.updateemailTemplate=updateemailTemplate;
exports.deleteemailTemplate=deleteemailTemplate;