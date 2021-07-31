const checkAuth = require('../middleware/check-auth');
const express = require('express');

const router = express.Router();

const smsTemplate = require('../controller/template-controller');

const userTemplate = require('../controller/user-controller');



//User routes



router.post('/createuser',userTemplate.createUser);
router.get('/checkuser',userTemplate.checkUser);
router.get('/readuser',userTemplate.getUser);
router.get('/readallusers',userTemplate.readallusers);
router.patch('/updateuser',userTemplate.updateUser);
router.get('/readfacebookuser',userTemplate.getfacebookuser);

//  router.use(checkAuth);


//Template routes
//router.get('/readalltemplates',smsTemplate.readAllSMSTemplate);
//router.get('/readonetemplate/:id',smsTemplate.readOneSMSTemplate);
//router.get('/readnametemplate/:tname',smsTemplate.readNameSMSTemplate);
//router.post('/create',smsTemplate.createSMSTemplate);
//router.patch('/updatetemplate/:id',smsTemplate.updateTemplate);
//router.delete('/deletetemplate/:id',smsTemplate.deleteTemplate);




module.exports=router;





// Learning: next is used for  anync and throw is used for sync

//router.get('/api/:smsId',readSMSTemplate.readOneSMSTemplate);

//catchall
// router.get('/',(req, res, next)=>{
//     return res.status(401).json('The API Server is working, however route is not correct');
//     //return ensures that no lines below this return will be exeuted.
// })

//const Smstemplatemodel = require('../dbmodels/smstemplatemodel');