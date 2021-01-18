const express = require('express');
const router = express.Router();

const mechApiController = require('../../api/MechanicAPI');

router.get('/', mechApiController.getMechanics);
router.get('/:mech_id', mechApiController.getMechanicById);
router.post('/', mechApiController.createMechanic);
router.put('/:mech_id', mechApiController.updateMechanic);
router.delete('/:mech_id', mechApiController.deleteMechanic);

module.exports = router;