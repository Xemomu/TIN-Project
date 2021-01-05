const express = require('express');
const router = express.Router();

const specApiController = require('../../api/SpecAPI');

router.get('/', specApiController.getSpecs);
router.get('/:specId', specApiController.getSpecById);
router.post('/', specApiController.createSpec);
router.put('/:specId', specApiController.updateSpec);
router.delete('/:specId', specApiController.deleteSpec);

module.exports = router;