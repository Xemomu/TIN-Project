const express = require('express');
const router = express.Router();
const mechSpecController = require('../controllers/mechSpecController');

router.get('/', mechSpecController.showMechSpecList);
router.get('/add', mechSpecController.showAddMechSpecForm);
router.get('/edit/:mechSpecId', mechSpecController.showEditMechSpecForm);
router.get('/details/:mechSpecId', mechSpecController.showMechSpecDetails);

router.post('/add', mechSpecController.addMechSpec);
router.post('/edit', mechSpecController.updateMechSpec);
router.get('/delete/:mechSpecId', mechSpecController.deleteMechSpec);

module.exports = router;