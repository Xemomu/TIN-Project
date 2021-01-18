const MechSpecRepository = require('../repository/mysql2/MechSpecRepository');

exports.getMechSpecs = (req, res, next) => {
    MechSpecRepository.getMechSpecs()
        .then(mechSpec => {
            res.status(200).json(mechSpec);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getMechSpecById = (req, res, next) => {
    const mechSpecId = req.params.mechspec_id;
    MechSpecRepository.getMechSpecById(mechSpecId)
        .then(mech => {
            if (!mech) {
                res.status(404).json({
                    message: 'MechSpec with id: ' + mechSpecId + ' not found'
                })
            } else {
                res.status(200).json(mech);
            }
        });
};

exports.createMechSpec = (req, res, next) => {
    MechSpecRepository.createMechSpec(req.body)
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

exports.updateMechSpec = (req, res, next) => {
    const mechSpecId = req.params.mechspec_id;
    MechSpecRepository.updateMechSpec(mechSpecId, req.body)
        .then(result => {
            res.status(200).json({message: 'MechSpec updated!', mechspec: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteMechSpec = (req, res, next) => {
    const mechSpecId = req.params.mechspec_id;
    MechSpecRepository.deleteMechSpec(mechSpecId)
        .then(result => {
            res.status(200).json({message: 'Removed mechSpec', mechspec: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

