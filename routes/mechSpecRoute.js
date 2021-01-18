const express = require('express');
const router = express.Router();
const mechSpecController = require('../controllers/mechSpecController');

router.get('/', mechSpecController.showMechSpecList);
router.get('/add', mechSpecController.showAddMechSpecForm);
router.get('/edit/:mechspec_id', mechSpecController.showEditMechSpecForm);
router.get('/details/:mechspec_id', mechSpecController.showMechSpecDetails);

router.post('/add', mechSpecController.addMechSpec);
router.post('/edit', mechSpecController.updateMechSpec);
router.get('/delete/:mechspec_id', mechSpecController.deleteMechSpec);

module.exports = router;