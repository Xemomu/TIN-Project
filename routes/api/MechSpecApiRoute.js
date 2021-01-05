const express = require('express');
const router = express.Router();

const mechSpecApiController = require('../../api/MechSpecAPI');

router.get('/', mechSpecApiController.getMechSpecs);
router.get('/:mechSpecId', mechSpecApiController.getMechSpecById);
router.post('/', mechSpecApiController.createMechSpec);
router.put('/:mechSpecId', mechSpecApiController.updateMechSpec);
router.delete('/:mechSpecId', mechSpecApiController.deleteMechSpec);

module.exports = router;