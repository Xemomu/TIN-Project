const express = require('express');
const router = express.Router();

const specApiController = require('../../api/SpecAPI');

router.get('/', specApiController.getSpecs);
router.get('/:spec_id', specApiController.getSpecById);
router.post('/', specApiController.createSpec);
router.put('/:spec_id', specApiController.updateSpec);
router.delete('/:spec_id', specApiController.deleteSpec);

module.exports = router;