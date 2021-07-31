const workflowtemplatemodel = require('../dbmodels/workflowtemplatemodel');

const readAllWFTemplate =async (req, res, next) => 
{
    const wftemplate = await workflowtemplatemodel.find().exec();

    // const wfname=await wftemplate.map(d => d.wfname);
    // const wfsteps=await wftemplate.map(d => d.wfsteps);


    // console.log(wfname);
    // console.log(wfsteps);
    res.json(wftemplate);
    //res.json({message:'Response wit all SMS templates from controller'}).status(200);
}

const readOneWFTemplate = async (req, res, next) => {
   
    const id = req.query._id
    console.log('Idd from the URL:'+ id);
    const result = await workflowtemplatemodel.findById({_id:id}).exec();
    res.json(result);
};

const readNameWFTemplate = async (req, res, next) => {

    const name = req.params.wfname;

    const result = await workflowtemplatemodel.find({wfname: name}).exec();

    res.json(result);

};

const createWFTemplate =  async (req, res, next) => {

    const reqData = req.body;


    console.log(reqData);
    
    const createWFTemplate = new workflowtemplatemodel(reqData);

    console.log(createWFTemplate);

    try{
        const result = await createWFTemplate.save();
    } catch (error)
    {
        console.log('WF Template creation failed:'+error);
    }
    
    console.log('WF Template creation sucessful');
    res.json("Success");
}

// const updateTemplate = async (req, res, next) => {

//     const id = req.body.idd;

//     const tname = req.body.tname;
//     const text = req.body.text;
//     console.log(tname);
//     console.log(text);

//     const template = await Smstemplatemodel.findById(id).exec();
                           
//     console.log(template);

//     template.tname=tname;
//     template.text=text;

//     const result = await template.save();

//     res.json(result);

// };


const deleteWFTemplate =  async (req, res, next) => {

    const id = req.query._id;

    const template = await workflowtemplatemodel.findById(id).exec();

    const result = template.delete();

    res.json(result);

};


exports.readAllWFTemplate=readAllWFTemplate;
exports.createWFTemplate=createWFTemplate;
exports.readOneWFTemplate=readOneWFTemplate;
exports.readNameWFTemplate=readNameWFTemplate;
// exports.updateTemplate=updateTemplate;
exports.deleteWFTemplate=deleteWFTemplate;