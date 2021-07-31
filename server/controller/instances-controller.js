const instancemodel = require('../dbmodels/instancemodel');

const readAllinstances =async (req, res, next) => 
{

    console.log('#####################################################################################')
    console.log(process.env.INSTANCE_VIEW_LIMIT)
    console.log(Number(process.env.INSTANCE_VIEW_LIMIT))

    // const instancedata = await instancemodel.find().exec();
    // const instancedata = await instancemodel.find().limit(1000).exec();
    const instancedata = await instancemodel.find().sort({"entrydate":-1}).limit(Number(process.env.INSTANCE_VIEW_LIMIT)).exec();


    //console.log(instancedata);
    res.json(instancedata);
}

const readOneinstanceById = async (req, res, next) => {
    console.log('Into readOneinstance block');
    const id = req.query.idd;
    console.log('Idd from the URL:'+ id);
    const result = await instancemodel.findById({_id:id}).exec();
    console.log('Result for the response:'+ result);
    res.json(result);
    // res.json(true);
};


const readOneinstanceByParameters = async (req, res, next) => {
    const searchCriteria = req.query.searchCode;

    // This is API can only be called using 'FLCE' for searching
    // when 'F000' then only first name is searched from the mangoose model
    // when '0L00' then only first name is searched from the mangoose model
    // when '00C0' then only first name is searched from the mangoose model
    // when '000E' then only first name is searched from the mangoose model
    // F - firstName, L- lastName, C- contactNo, E - email


    console.log(req.query.firstName);

    console.log(searchCriteria.substr(0,1));
    console.log(searchCriteria.substr(1,1));
    console.log(searchCriteria.substr(2,1));
    console.log(searchCriteria.substr(3,1));

    console.log("firstName:"+req.query.firstName);
    console.log("lastName:"+req.query.lastName);
    console.log("contactNo:"+req.query.contactNo);
    console.log("emailId:"+req.query.emailId);
    console.log("searchCode:"+req.query.searchCode);

    var fsearch = "",lsearch ="",csearch="",esearch="";

    
    // console.log('Contact number from the request:'+ req.query.contactNo)
    // console.log('Email id from the request:'+ req.query.emailId)
    
    if (searchCriteria.substr(0,1) == "F")  {fsearch = {firstName: req.query.firstName}}
    if (searchCriteria.substr(1,1) == "L")  {lsearch = {lastName: req.query.lastName}}
    if (searchCriteria.substr(2,1) == "C")  {csearch = {contactNo: req.query.contactNo}}
    if (searchCriteria.substr(3,1) == "E")  {esearch = {emailID: req.query.emailId}}


     var searchString;

     console.log('FirstName from API')
     console.log(fsearch)

    if(fsearch) {
        searchString = fsearch;
    } 

    console.log(searchString)

    if(searchString?.searchString && lsearch?.lsearch) {
        searchString = searchString + "," + lsearch;
    } else if (lsearch)
    {
        searchString = lsearch;
    }

    console.log(searchString)
    
    if(searchString?.searchString && csearch?.csearch) {
        searchString = searchString + "," + csearch;
    }  else if (csearch)
    {
        searchString = csearch;
    }

    console.log(searchString)

    if(searchString?.searchString && esearch?.esearch) {
        searchString = searchString + "," + esearch;
    }   else if (esearch)
    {
        searchString = esearch;
    }

    
    // console.log(searchString)
    console.log('searchString:');
    console.log(searchString);

    const result = await instancemodel.find(searchString).sort({"entrydate":-1}).limit(Number(process.env.INSTANCE_VIEW_LIMIT)).exec();

    //  console.log('Result output:'+result);

    // let FirstName = result.map((instance)=>instance.firstName);
    // res.json({firstName:FirstName});

    // console.log('Result output converted to String:'+JSON.stringify(result));

    res.json(JSON.stringify(result));
  

};


const createinstances =  async (req, res, next) => {

    const reqData = req.body;

    console.log(reqData);
    
    const createinstancedata = new instancemodel(reqData);

    console.log(createinstancedata);

    try{
        console.log('Into createinstance block');
        const result = await createinstancedata.save();
    } catch (error)
    {
        console.log('Instance creation failed:'+error);
        return res.json("Success");
    }
    
    console.log('Instance creation sucessful');
    res.json("Success");
}

const updateinstance = async (req, res, next) => {

    const id = req.body.id;
    const subid = req.body.subid;
    const substatus = req.body.substatus

    const subexecutiondate = (new Date())

    var instance = await instancemodel.findById(id).exec();

    var arr=(instance.wfsteps)

    

    for (var i =0; i < arr.length ; i++) {
        if (arr[i]._id == subid) {
            console.log(arr[i].sstatus)
            arr[i].sstatus= substatus
            console.log(arr[i].sstatus)
            instance.wfsteps =arr
            const result= await instance.save()
        }
        

    }


    // block to update the item status
    var itemtatus = 0
    instance = await instancemodel.findById(id).exec();
    arr=(instance.wfsteps)
    for (var i =0; i < arr.length ; i++) {
        if (arr[i].sstatus != "success") {
            itemtatus=itemtatus+1
        }
    }

    console.log('count:'+itemtatus)

    if (itemtatus < 1) {
        instance.instanceStatus ="completed"
        const result= await instance.save()
     
    }


    res.json(instance);

};


// const deleteinstances =  async (req, res, next) => {

//     const id = req.query._id;

//     const template = await instancemodel.findById(id).exec();

//     const result = template.delete();

//     res.json(result);

// };


exports.readAllinstances=readAllinstances;
exports.createinstances=createinstances;
exports.updateinstance=updateinstance;
exports.readOneinstanceById=readOneinstanceById;
exports.readOneinstanceByParameters=readOneinstanceByParameters;


// exports.readNameinstancedata=readNameinstancedata;
// exports.updateTemplate=updateTemplate;
// exports.deleteinstancedata=deleteinstancedata;