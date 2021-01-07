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
                specId: specId,
                mechspecs: {},
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
    SpecRepository.getSpecById(specId)
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

exports.addSpec = (req, res, next) => {
    const specData = { ...req.body };
    SpecRepository.createSpec(specData)
        .then( result => {
            res.redirect('/specs');
        }).catch(err => {
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
    const specData = { ...req.body };

    SpecRepository.updateSpec(specId, specData)
        .then( result => {
            res.redirect('/specs');
        }).catch(err => {
        res.render('pages/spec/spec-form', {
            spec: specData,
            pageTitle: 'Edycja specjalizacji',
            formMode: 'edit',
            btnLabel: 'Edytuj specjalizację',
            formAction: '/specs/add',
            navLocation: 'spec',
            validationErrors: err.details
        });
    });
};

exports.deleteSpec = (req, res, next) => {
    const specId = req.params.specId;
    SpecRepository.deleteSpec(specId)
        .then( (result) => {
            res.redirect('/specs');
        });
};

