const express = require('express');
const router = express.Router();
const mechanicController = require('../controllers/mechanicController');

router.get('/', mechanicController.showMechanicList);
router.get('/add', mechanicController.showAddMechanicForm);
router.get('/edit/:mechId', mechanicController.showEditMechanicForm);
router.get('/details/:mechId', mechanicController.showMechanicDetails);

router.post('/add', mechanicController.addMechanic);
router.post('/edit', mechanicController.updateMechanic);
router.get('/delete/:mechId', mechanicController.deleteMechanic);

module.exports = router;