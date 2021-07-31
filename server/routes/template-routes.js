const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

//const HttpError = require('../dbmodels/http-error');

//  router.use(checkAuth);

const smsTemplate = require('../controller/template-controller');
// const emailTemplate = require('../controller/template-controller');


// SMS
router.get('/readalltemplates',smsTemplate.readAllSMSTemplate);
router.get('/readonetemplate',smsTemplate.readOneSMSTemplate);
router.get('/readnametemplate/:tname',smsTemplate.readNameSMSTemplate);
router.post('/create',smsTemplate.createSMSTemplate);
router.patch('/updatetemplate/',smsTemplate.updateTemplate);
router.delete('/deletetemplate/',smsTemplate.deleteTemplate);


router.get('/emailtemplates',smsTemplate.readAllEmailTemplate);
router.get('/readoneemailtemplate',smsTemplate.readOneEmailTemplate);
router.get('/readnameemailtemplate/:tname',smsTemplate.readNameEmailTemplate);
router.post('/createemail',smsTemplate.createEmailTemplate);
router.patch('/updateemailtemplate/',smsTemplate.updateemailTemplate);
router.delete('/deleteemailtemplate/',smsTemplate.deleteemailTemplate);

// Learning: next is used for  anync and throw is used for sync

//router.get('/api/:smsId',readSMSTemplate.readOneSMSTemplate);

//catchall
// router.get('/',(req, res, next)=>{
//     return res.status(401).json('The API Server is working, however route is not correct');
//     //return ensures that no lines below this return will be exeuted.
// })

//const Smstemplatemodel = require('../dbmodels/smstemplatemodel');

module.exports=router;