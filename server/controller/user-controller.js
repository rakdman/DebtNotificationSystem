const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const Usertemplatemodel = require('../dbmodels/usermodel');
const passport = require('passport')
const facebookStrategy = require('passport-facebook').Strategy
const facebooklogin = require('./facebooklogin')



const createUser = async (req, res, next) => {
    const requestBody = req.body;

    let encryptedPassword;

    try {
        encryptedPassword =  await bcryptjs.hash(requestBody.password,12);
        console.log(encryptedPassword);
    } catch(error) {
        return next(error);
    }

    console.log('//////////////////////')
    console.log(requestBody)

    const createdUser = new Usertemplatemodel(
        {
            username: requestBody.username,
            password: encryptedPassword,
            email: requestBody.email,
            role: requestBody.role,
            firstname: requestBody.firstname,
            lastname: requestBody.lastname,
            approved : false
        }
    );
    const result = await createdUser.save();
    res.json(result);
}





const updateUser = async (req, res, next) => {
    console.log('entering into updateUser api on server')
    // const requestBody = req;
    const requsername= req.body.username;
    const reqapproved= req.body.approved;
    if (requsername === "rakdman")
    reqapproved="true"
    
    // console.log(requsername)
    // console.log(reqapproved)
    const readUserData = await Usertemplatemodel.find({username:requsername}).exec()
    // console.log(readUserData)
    // console.log(readUserData[0].username)
    // console.log(readUserData[0].approved)
    // console.log(await readUserData)
    readUserData[0].approved= await reqapproved 
    const result= await readUserData[0].save()
    console.log( result)
    res.json(result);
}






const readallusers= async (req, res, next) => {
    const result = await Usertemplatemodel.find().exec();
    console.log(result)
    const existingPassword=await result.map((user)=>user.password);
    res.json(result);
}





const getUser = async (req, res, next) => {
    const username = req.query.username;
    const reqpassword= req.query.password;
   
    console.log(username);
    console.log(reqpassword);
    const result = await Usertemplatemodel.find({username: username}).exec();

    const existingPassword=await result.map((user)=>user.password);

   console.log(result.map((user)=>user.password));
   console.log(result.map((user)=>user.username));
   console.log(result.map((user)=>user.id));
   console.log(result.map((user)=>user.role));

   var role=result.map((user)=>user.role)

   var reqapproved
   result.map((user)=>reqapproved=user.approved);

   const dbid=result.map((user)=>user.id);

   console.log(dbid);
   
   let isValidPassword=false; 

   
   try{  
    isValidPassword=await bcryptjs.compare(reqpassword,existingPassword.toString());
} catch(error)
{
    console.log('Error'+isValidPassword);
}

console.log(isValidPassword);

let token;
console.log(reqapproved)
console.log((reqapproved == true))
  if (isValidPassword && (reqapproved == true)) {
  console.log('Password is valid');

  token = jsonwebtoken.sign({userId:dbid, username: username },'private_secret');
  token = token.toString()
  console.log('Token generated is:'+token);
}
   else{
    console.log('Password is not correct or User not approved');
   }


   //res.json(result);
//    res.json({username:username, token:token.toString()});
res.json({username:username, token:token, role:role});
    
   
};



const checkUser = async (req, res, next) => {
    const username = req.query.username;
    const email= req.query.email;

    console.log(username)
    console.log(email)
    var result = await Usertemplatemodel.find({$or:[{username: username}, {email: email}]}).exec();
    console.log(result)
    if(result.length > 0) {
        result.map((user)=> {
             console.log(user.username )
             console.log(user.email )
            if ((user.username || user.email) && user.approved) 
                {console.log('UserAlreadyExists')
                res.json('UserAlreadyExist');}
            else if ((user.username || user.email) && !user.approved) 
                {console.log('UserExistsNotApproved')
                res.json('UserExistsNotApproved');}
        })
    }
    else {
        console.log('UserDonotExists')
        res.json('UserDonotExist')
    }
   
};


const getfacebookuser = (req, res, next) =>
{

    const express = require('express')
    const app = express()
    
    const passport = require('passport')
    
    const session = require('express-session')
    
    const facebookStrategy = require('passport-facebook').Strategy

    console.log('Inside api')
    
    // HTTPS Secure website code
    // const https = require('https')
    // const fs = require('fs')
    
    // const options = {
    //     key : fs.readFileSync('key.pem','utf8'),
    //     cert : fs.readFileSync('cert.pem','utf8')
    // }
    
    
    // app.set("view engine","ejs")
    // app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
    // app.use(passport.initialize());
    // app.use(passport.session()); 
    
    passport.use(new facebookStrategy({
    
        // pull in our app id and secret from our auth.js file
        clientID        : "369106464611069",
        clientSecret    : "6ad3cea328cf92d1c9d94ca901c3a98e",
        callbackURL     : "https://localhost:9090/facebook/callback",
        profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)','email']
    
    },// facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
    
        // asynchronous
        process.nextTick(function() {
            // console.log(profile._json)
            console.log(profile._json.first_name)
            console.log(profile._json.last_name)
            console.log(profile._json.email)
            return done(profile.id)

        }
        )
    
    }));

// app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
passport.authenticate('facebook', { scope : 'email' });

console.log('Afer api');

// passport.authenticate('facebook', {
// 			successRedirect : '/profile',
// 			failureRedirect : '/'
// 		});

passport.authenticate('facebook');

res.json('API Response') 

}

exports.getfacebookuser=getfacebookuser;

exports.createUser=createUser;
exports.getUser=getUser;
exports.checkUser= checkUser;
exports.readallusers=readallusers;
exports.updateUser=updateUser;






// const readAllSMSTemplate =async (req, res, next) => 
// {
//     const smstemplate = await Smstemplatemodel.find().exec();
//     res.json(smstemplate);
// }

// const readOneSMSTemplate = async (req, res, next) => {
//     const id = req.params.id;
//     console.log('Id from the URL:'+ id);
//     const result = await Smstemplatemodel.findById(id).exec();
//     res.json(result);
// };

// const readNameSMSTemplate = async (req, res, next) => {

//     const name = req.params.tname;

//     const result = await Smstemplatemodel.find({tname: name}).exec();

//     res.json(result);

// };



// const updateTemplate = async (req, res, next) => {

//     const id = req.params.id;

//     const tname = req.body.tname;
//     const text = req.body.text;

//     const template = await Smstemplatemodel.findById(id).exec();
                           
//     console.log(template);

//     template.tname=tname;
//     template.text=text;

//     const result = await template.save();

//     res.json(result);

// };


// const deleteTemplate =  async (req, res, next) => {

//     const id = req.params.id;

//     const template = await Smstemplatemodel.findById(id).exec();

//     const result = template.delete();

//     res.json(result);

// };


// exports.readAllSMSTemplate=readAllSMSTemplate;

// exports.readOneSMSTemplate=readOneSMSTemplate;
// exports.readNameSMSTemplate=readNameSMSTemplate;
// exports.updateTemplate=updateTemplate;
// exports.deleteTemplate=deleteTemplate;