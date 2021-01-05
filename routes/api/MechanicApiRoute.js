const express = require('express');
const router = express.Router();

const mechApiController = require('../../api/MechanicAPI');

router.get('/', mechApiController.getMechanics);
router.get('/:mechId', mechApiController.getMechanicById);
router.post('/', mechApiController.createMechanic);
router.put('/:mechId', mechApiController.updateMechanic);
router.delete('/:mechId', mechApiController.deleteMechanic);

module.exports = router;