const { readAllSMSTemplate } = require('../controller/template-controller');

jwt = require('jsonwebtoken');
module.exports = (req,res, next) => {

    console.log('Into Check auth middleware function'+req.headers.authorization);

    let token;
    
    try{
        console.log('Provided token is:'+req.headers.authorization.split(" ")[2])
        token = req.headers.authorization.split(' ')[2];  // Bearer Token
    } catch(error) {
        console.log('Authentication failed');
        return next(error);
    }
    

  

    try{

        if(!token)
        {
            throw new Error("Authentication failed");
         }
        const decodedToken= jwt.verify(token,'private_secret');
        req.userData = {userID : decodedToken.userID };
        next();
    } catch(error)
    {
        console.log('Token did not match-Authentication failed');
        return next(error);
    }
    
} 