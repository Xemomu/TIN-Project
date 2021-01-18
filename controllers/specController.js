const SpecRepository = require('../repository/mysql2/SpecRepository');


exports.showSpecList = (req, res, next) => {
    SpecRepository.getSpecs()
        .then(specs => {
            res.render('pages/spec/spec-list', {
                specs: specs,
                navLocation: 'spec'
            });
        });
}

exports.showAddSpecForm = (req, res, next) => {
    const validationErrors = []
    res.render('pages/spec/spec-form', {
        spec: {},
        pageTitle: 'Nowa specjalizacja',
        formMode: 'createNew',
        btnLabel: 'Dodaj specjalizację',
        formAction: '/specs/add',
        navLocation: 'spec',
        validationErrors: validationErrors
    });
}

exports.showEditSpecForm = (req, res, next) => {
    const validationErrors = []
    const specId = req.params.spec_id;
    SpecRepository.getSpecById(specId)
        .then(spec => {
            res.render('pages/spec/spec-form', {
                spec: spec,
                formMode: 'edit',
                pageTitle: 'Edycja specjalizacji',
                btnLabel: 'Edytuj specjalizację',
                formAction: '/specs/edit',
                navLocation: 'spec',
                validationErrors: validationErrors
            });
        });
};


exports.showSpecDetails = (req, res, next) => {
    const validationErrors = []
    const spec_id = req.params.spec_id;
    
    SpecRepository.getSpecById(spec_id)
        .then(spec => {
            res.render('pages/spec/spec-form', {
                spec: spec,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły specjalizacji',
                formAction: '',
                navLocation: 'spec',
                validationErrors: validationErrors
            });
        });
}
// exports.showSpecDetails = (req, res, next) => {
//     const validationErrors = []
//     const spec_id = req.params.spec_id;
//     let mechspecs;
//
//     SpecRepository.getSpecMechSpec(spec_id)
//         .then(mechspcs => {
//             mechspecs = mechspcs;
//             return SpecRepository.getSpecById(spec_id)
//         })
//         .then(spec => {
//             res.render('pages/spec/spec-form', {
//                 spec: spec,
//                 mechspecs: mechspecs,
//                 formMode: 'showDetails',
//                 pageTitle: 'Szczegóły specjalizacji',
//                 formAction: '',
//                 navLocation: 'spec',
//                 validationErrors: validationErrors
//             });
//         });
// }

exports.addSpec = (req, res, next) => {
    const specData = {...req.body};
    SpecRepository.createSpec(specData)
        .then(result => {
            res.redirect('/specs');
        })
        .catch(err => {
            console.log(err.details);
            res.render('pages/spec/spec-form', {
                spec: specData,
                pageTitle: 'Nowa specjalizacja',
                formMode: 'createNew',
                btnLabel: 'Dodaj specjalizację',
                formAction: '/specs/add',
                navLocation: 'spec',
                validationErrors: err.details
            });
        });
};

exports.updateSpec = (req, res, next) => {
    const specId = req.body._id;
    const specData = {...req.body};
    let error;
    const _id = specId;
    specData._id = _id;

    SpecRepository.updateSpec(specId, specData)
        .then(result => {
            res.redirect('/specs');
        })
        .catch(err => {
            error = err;
            return SpecRepository.getSpecMechSpec(specId)
        })
        .then(mechs => {
            res.render('pages/spec/spec-form', {
                spec: specData,
                _id: _id,
                mechspecs: mechs,
                formMode: 'edit',
                pageTitle: 'Edycja specjalizacji',
                btnLabel: 'Edytuj specjalizację',
                formAction: '/specs/add',
                navLocation: 'spec',
                validationErrors: error.details
            });
        });
};

exports.deleteSpec = (req, res, next) => {
    const specId = req.params.spec_id;
    SpecRepository.deleteSpec(specId)
        .then((result) => {
            res.redirect('/specs');
        });
};