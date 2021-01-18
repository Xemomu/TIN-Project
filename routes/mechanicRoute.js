const express = require('express');
const router = express.Router();
const mechanicController = require('../controllers/mechanicController');

router.get('/', mechanicController.showMechanicList);
router.get('/add', mechanicController.showAddMechanicForm);
router.get('/edit/:mech_id', mechanicController.showEditMechanicForm);
router.get('/details/:mech_id', mechanicController.showMechanicDetails);

router.post('/add', mechanicController.addMechanic);
router.post('/edit', mechanicController.updateMechanic);
router.get('/delete/:mech_id', mechanicController.deleteMechanic);

module.exports = router;