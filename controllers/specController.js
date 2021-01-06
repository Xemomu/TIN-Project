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
    res.render('pages/spec/spec-form', {
        spec: {},
        pageTitle: 'Nowa specjalizacja',
        formMode: 'createNew',
        btnLabel: 'Dodaj specjalizację',
        formAction: '/specs/add',
        navLocation: 'spec'
    });
}

exports.showEditSpecForm = (req, res, next) => {
    const specId = req.params.specId;
    SpecRepository.getSpecById(specId)
        .then(spec => {
            res.render('pages/spec/spec-form', {
                spec: spec,
                formMode: 'edit',
                pageTitle: 'Edycja specjalizacji',
                btnLabel: 'Edytuj specjalizację',
                formAction: '/specs/edit',
                navLocation: 'spec'
            });
        });
};


exports.showSpecDetails = (req, res, next) => {
    const specId = req.params.specId;
    SpecRepository.getSpecById(specId)
        .then(spec => {
            res.render('pages/spec/spec-form', {
                spec: spec,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły specjalizacji',
                formAction: '',
                navLocation: 'spec'
            });
        });
}

exports.addSpec = (req, res, next) => {
    const specData = { ...req.body };
    SpecRepository.createSpec(specData)
        .then( result => {
            res.redirect('/specs');
        });
};

exports.updateSpec = (req, res, next) => {
    const specId = req.body._id;
    const specData = { ...req.body };
    SpecRepository.updateSpec(specId, specData)
        .then( result => {
            res.redirect('/specs');
        });
};

exports.deleteSpec = (req, res, next) => {
    const specId = req.params.specId;
    SpecRepository.deleteSpec(specId)
        .then( (result) => {
            res.redirect('/specs');
        });
};

