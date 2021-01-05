const SpecRepository = require('../repository/mysql2/SpecRepository');

exports.getSpecs = (req, res, next) => {
    SpecRepository.getSpecs()
        .then(specs => {
            res.status(200).json(specs);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getSpecById = (req, res, next) => {
    const specId = req.params.specId;
    SpecRepository.getSpecById(specId)
        .then(spec => {
            if(!spec) {
                res.status(404).json({
                    message: 'Spec with id: '+specId+' not found'
                })
            } else {
                res.status(200).json(spec);
            }
        });
};

exports.createSpec = (req, res, next) => {
    SpecRepository.createSpec(req.body)
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

exports.updateSpec = (req, res, next) => {
    const specId = req.params.specId;
    SpecRepository.updateSpec(specId, req.body)
        .then(result => {
            res.status(200).json({message: 'Spec updated!', spec: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteSpec = (req, res, next) => {
    const specId = req.params.specId;
    SpecRepository.deleteSpec(specId)
        .then(result => {
            res.status(200).json({message: 'Removed spec', spec: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

