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
    const mechspec = {
        _id: -1,
        mechanic: {
            _id: -1,
        },
        spec: {
            _id: -1,
        }
    }

    SpecRepository.getSpecs()
        .then(specs => {
            allSpecs = specs;
            return MechanicRepository.getMechanics();
        })
        .then(mechs => {
            allMechs = mechs;
            res.render('pages/mechSpec/mechanic-spec-form', {
                mechspec: mechspec,
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
    const mechSpecId = req.params.mechspec_id;

    MechanicRepository.getMechanics()
        .then(mechs => {
            allMechs = mechs;
            return SpecRepository.getSpecs();
        })
        .then(specs => {
            allSpecs = specs;
            return MechSpecRepository.getMechSpecById(mechSpecId)
        })
        .then(mchspec => {
            res.render('pages/mechSpec/mechanic-spec-form', {
                mechspec: mchspec,
                allMechs: allMechs,
                allSpecs: allSpecs,
                formMode: 'edit',
                pageTitle: 'Zaktualizuj wpis',
                btnLabel: 'Zaktualizuj wpis',
                formAction: '/mechSpec/edit',
                navLocation: 'mechSpec',
                validationErrors: []
            });
        })
};

exports.showMechSpecDetails = (req, res, next) => {
    let allMechs, allSpecs;
    const mechSpecId = req.params.mechspec_id;
    console.log("Show spec details for specId");

    MechanicRepository.getMechanics()
        .then(mechs => {
            allMechs = mechs;
            return SpecRepository.getSpecs();
        })
        .then(specs => {
            allSpecs = specs;
            return MechSpecRepository.getMechSpecById(mechSpecId)
        }).then(mchspec => {
        res.render('pages/mechSpec/mechanic-spec-form', {
            mechspec: mchspec,
            allMechs: allMechs,
            allSpecs: allSpecs,
            formMode: 'showDetails',
            pageTitle: 'Szczegóły wpisu',
            formAction: '',
            navLocation: 'mechSpec',
            validationErrors: []
        });
    });
}

exports.addMechSpec = (req, res, next) => {
    const mechSpecData = {...req.body};
    let allMechs, allSpecs;

    console.log(req.body);

    MechSpecRepository.createMechSpec(mechSpecData)
        .then(result => {
            res.redirect('/mechSpec');
        })
        .catch(err => {
            const mechspec = {
                _id: -1,
                mechanic: {
                    _id: mechSpecData['mech_id']
                },
                spec: {
                    _id: mechSpecData['spec_id']
                },
                specLvl: mechSpecData['specLvl'],
                date: mechSpecData['date'],
            }
            console.log(mechSpecData.mech_id);
            console.log(mechSpecData.spec_id);
            console.log(err.details);
            MechanicRepository.getMechanics()
                .then(mechs => {
                    allMechs = mechs;
                    return SpecRepository.getSpecs();
                })
                .then(specs => {
                    allSpecs = specs;
                    res.render('pages/mechSpec/mechanic-spec-form', {
                        allMechs: allMechs,
                        allSpecs: allSpecs,
                        mechspec: mechspec,
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
    const mechSpecId = req.body._id;
    const mechSpecData = {...req.body};
    let allMechs, allSpecs;

    console.log(req.body._id);

    MechSpecRepository.updateMechSpec(mechSpecId, mechSpecData)
        .then(result => {
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
                    return MechSpecRepository.getMechSpecById(mechSpecId)
                .then(mechsp => {
                    res.render('pages/mechSpec/mechanic-spec-form', {
                        allMechs: allMechs,
                        allSpecs: allSpecs,
                        mechspec: mechsp,
                        pageTitle: 'Zaktualizuj wpis',
                        formMode: 'edit',
                        btnLabel: 'Zaktualizuj wpis',
                        formAction: '/mechSpec/edit',
                        navLocation: 'mechSpec',
                        validationErrors: err.details
                    });
                });
        });
    });
};

exports.deleteMechSpec = (req, res, next) => {
    const mechSpecId = req.params.mechspec_id;
    MechSpecRepository.deleteMechSpec(mechSpecId)
        .then((result) => {
            res.redirect('/mechSpec');
        });
};