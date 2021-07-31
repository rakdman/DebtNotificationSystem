const express = require('express');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// router.use(checkAuth);

const workflowTemplate = require('../controller/workflow-controller');



router.get('/readallwftemplate',workflowTemplate.readAllWFTemplate);

router.get('/readoneWFtemplate',workflowTemplate.readOneWFTemplate);
router.get('/readnamewftemplate/:wfname',workflowTemplate.readNameWFTemplate);

router.post('/create',workflowTemplate.createWFTemplate);

// router.patch('/updatetemplate/',smsTemplate.updateTemplate);

router.delete('/deletewftemplate/',workflowTemplate.deleteWFTemplate);



module.exports=router;