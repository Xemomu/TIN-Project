const express = require('express');
const router = express.Router();
const specController = require('../controllers/specController');

router.get('/', specController.showSpecList);
router.get('/add', specController.showAddSpecForm);
router.get('/edit/:spec_id', specController.showEditSpecForm);
router.get('/details/:spec_id', specController.showSpecDetails);

router.post('/add', specController.addSpec);
router.post('/edit', specController.updateSpec);
router.get('/delete/:spec_id', specController.deleteSpec);

module.exports = router;