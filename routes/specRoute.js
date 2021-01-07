const express = require('express');
const router = express.Router();
const specController = require('../controllers/specController');

router.get('/', specController.showSpecList);
router.get('/add', specController.showAddSpecForm);
router.get('/edit/:specId', specController.showEditSpecForm);
router.get('/details/:specId', specController.showSpecDetails);

router.post('/add', specController.addSpec);
router.post('/edit', specController.updateSpec);
router.get('/delete/:specId', specController.deleteSpec);

module.exports = router;