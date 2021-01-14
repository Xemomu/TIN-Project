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
    const specId = req.params.specId;
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
    const specId = req.params.specId;
    let mechspecs;
    SpecRepository.getSpecMechSpec(specId)
        .then(mechs => {
            mechspecs = mechs;
            return SpecRepository.getSpecById(specId)
        })
        .then(spec => {
            res.render('pages/spec/spec-form', {
                spec: spec,
                mechspecs: mechspecs,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły specjalizacji',
                formAction: '',
                navLocation: 'spec',
                validationErrors: validationErrors
            });
        });
}

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
                specId: _id,
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
    const specId = req.params.specId;
    SpecRepository.deleteSpec(specId)
        .then((result) => {
            res.redirect('/specs');
        });
};

