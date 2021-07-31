const express = require('express');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const integration = require('../controller/integration-controller');

//  router.use(checkAuth);

router.post('/sendemail',integration.sendemail);
router.post('/loadfile',integration.loadfile);
router.post('/loadpaymentfile',integration.loadPaymentfile);
router.get('/readloadschedule',integration.readloadschedule)
// router.get('/readoneinstancebyid/',instances.readOneinstanceById);
// router.get('/readoneinstancesbyparams/',instances.readOneinstanceByParameters);

// router.patch('/updateinstance/',smsTemplate.updateInstance);
// router.delete('/deleteinstances/',instances.deleteinstances);

module.exports=router;