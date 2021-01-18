const MechanicRepository = require('../repository/mysql2/MechanicRepository');

exports.getMechanics = (req, res, next) => {
    MechanicRepository.getMechanics()
        .then(mechs => {
            res.status(200).json(mechs);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getMechanicById = (req, res, next) => {
    const mechId = req.params.mech_id;
    MechanicRepository.getMechanicById(mechId)
        .then(mech => {
            if (!mech) {
                res.status(404).json({
                    message: 'Mechanic with id: ' + mechId + ' not found'
                })
            } else {
                res.status(200).json(mech);
            }
        });
};

exports.createMechanic = (req, res, next) => {
    MechanicRepository.createMechanic(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateMechanic = (req, res, next) => {
    const mechId = req.params.mech_id;
    MechanicRepository.updateMechanic(mechId, req.body)
        .then(result => {
            res.status(200).json({message: 'Mechanic updated!', mechanic: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteMechanic = (req, res, next) => {
    const mechId = req.params.mech_id;
    MechanicRepository.deleteMechanic(mechId)
        .then(result => {
            res.status(200).json({message: 'Removed mechanic', mechanic: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};