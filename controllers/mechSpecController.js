const MechanicRepository = require('../repository/mysql2/MechanicRepository');
const SpecRepository = require('../repository/mysql2/SpecRepository');
const MechSpecRepository = require('../repository/mysql2/MechSpecRepository');

exports.showMechSpecList = (req, res, next) => {
    MechSpecRepository.getMechSpecs()
        .then(mechspecs => {
            res.render('pages/mechSpec/mechanic-spec-list', {
                mechspecs: mechspecs,
                navLocation: 'mechSpec'
            });
        });
}

exports.showAddMechSpecForm = (req, res, next) => {
    let allMechs, allSpecs;

    SpecRepository.getSpecs()
        .then(specs => {
            allSpecs = specs;
            return MechanicRepository.getMechanics();
        })
        .then(mechs => {
            allMechs = mechs;
            res.render('pages/mechSpec/mechanic-spec-form', {
                mechspec: {},
                allMechs: allMechs,
                allSpecs: allSpecs,
                formMode: 'createNew',
                pageTitle: 'Nowy wpis',
                btnLabel: 'Dodaj wpis',
                formAction: '/mechSpec/add',
                navLocation: 'mechSpec',
                validationErrors: []
            });
        });
}

exports.showEditMechSpecForm = (req, res, next) => {
    console.log(req.body);
    let allMechs, allSpecs;
    const mechSpecId = req.params.mechSpecId;

    MechanicRepository.getMechanics()
        .then(mechs => {
            allMechs = mechs;
            return SpecRepository.getSpecs();
        })
        .then(specs => {
            allSpecs = specs;
            return MechSpecRepository.getMechSpecById(mechSpecId)
        })
        .then(mechspec => {
            res.render('pages/mechSpec/mechanic-spec-form', {
                mechspec: mechspec,
                formMode: 'edit',
                allMechs: allMechs,
                allSpecs: allSpecs,
                pageTitle: 'Edycja Mechanik-Specjalizacja',
                btnLabel: 'Edytuj Mechanik-Specjalizacja',
                formAction: '/mechSpec/edit',
                navLocation: 'mechSpec',
                validationErrors: []
            });
        })
};

exports.showMechSpecDetails = (req, res, next) => {
    let allMechs, allSpecs;
    const mechSpecId = req.params.mechSpecId;
    console.log("Show spec details for specId");
    MechanicRepository.getMechanics()
        .then(mechs => {
            allMechs = mechs;
            return SpecRepository.getSpecs();
        })
        .then(specs => {
            allSpecs = specs;
            return MechSpecRepository.getMechSpecById(mechSpecId)
        }).then(mechspec => {
            res.render('pages/mechSpec/mechanic-spec-form', {
                mechspec: {},
                formMode: 'showDetails',
                allMechs: allMechs,
                allSpecs: allSpecs,
                pageTitle: 'Szczegóły Mechanik-Specjalizacja',
                formAction: '',
                navLocation: 'mechSpec',
                validationErrors: []
            });
        });
}

exports.addMechSpec = (req, res, next) => {
    let allMechs, allSpecs;
    console.log(req.body);
    const mechSpecData = { ...req.body };
    MechSpecRepository.createMechSpec(mechSpecData)
        .then( result => {
            res.redirect('/mechSpec');
        })
        .catch(err => {
            console.log(err.details);
            MechanicRepository.getMechanics()
                .then(mechs => {
                    allMechs = mechs;
                    return SpecRepository.getSpecs();
                })
                .then(specs => {
                    allSpecs = specs;
            res.render('pages/mechSpec/mechanic-spec-form', {
                mechspec: mechSpecData,
                allMechs: allMechs,
                allSpecs: allSpecs,
                pageTitle: 'Nowy wpis',
                formMode: 'createNew',
                btnLabel: 'Dodaj wpis',
                formAction: '/mechSpec/add',
                navLocation: 'mechSpec',
                validationErrors: err.details
            });
        });
    });
};

exports.updateMechSpec = (req, res, next) => {
    console.log(req.body.id);
    const mechSpecId = req.body._id;
    const mechSpecData = { ...req.body };
    MechSpecRepository.updateMechSpec(mechSpecId, mechSpecData)
        .then( result => {
            res.redirect('/mechSpec');
        })
        .catch(err => {
            console.log(err.details);
            res.render('pages/mechSpec/mechanic-spec-form', {
                allMechs: {},
                allSpecs: {},
                mechspec: {},
                pageTitle: 'Nowy wpis',
                formMode: 'edit',
                btnLabel: 'Zaktualizuj wpis',
                formAction: '/mechSpec/add',
                navLocation: 'mechSpec',
                validationErrors: err.details
            });
        });
};

exports.deleteMechSpec = (req, res, next) => {
    const mechSpecId = req.params.mechSpecId;
    MechSpecRepository.deleteMechSpec(mechSpecId)
        .then( (result) => {
            res.redirect('/mechSpec');
        });
};