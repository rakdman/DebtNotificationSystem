const express = require('express');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const instances = require('../controller/instances-controller');

//  router.use(checkAuth);

router.post('/createinstance',instances.createinstances);
router.patch('/updateinstance',instances.updateinstance)
router.get('/readallinstances',instances.readAllinstances);
router.get('/readoneinstancebyid/',instances.readOneinstanceById);
router.get('/readoneinstancesbyparams/',instances.readOneinstanceByParameters);

// router.patch('/updateinstance/',smsTemplate.updateInstance);
// router.delete('/deleteinstances/',instances.deleteinstances);

module.exports=router;