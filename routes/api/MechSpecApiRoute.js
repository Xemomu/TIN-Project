const express = require('express');
const router = express.Router();

const mechSpecApiController = require('../../api/MechSpecAPI');

router.get('/', mechSpecApiController.getMechSpecs);
router.get('/:mechspec_id', mechSpecApiController.getMechSpecById);
router.post('/', mechSpecApiController.createMechSpec);
router.put('/:mechspec_id', mechSpecApiController.updateMechSpec);
router.delete('/:mechspec_id', mechSpecApiController.deleteMechSpec);

module.exports = router;