const MechanicRepository = require('../repository/mysql2/MechanicRepository');
const SpecRepository = require('../repository/mysql2/SpecRepository');
const MechSpecRepository = require('../repository/mysql2/MechSpecRepository');

exports.showMechSpecList = (req, res, next) => {
    MechSpecRepository.getMechSpecs()
        .then(mechspec => {
            res.render('pages/mechSpec/mechanic-spec-list', {
                mechspec: mechspec,
                navLocation: 'mechSpec'
            });
        });
}

exports.showAddMechSpecForm = (req, res, next) => {
    let allMechs, allSpecs;
    MechanicRepository.getMechanics()
        .then(mechs => {
            allMechs = mechs;
            return SpecRepository.getSpecs();
        })
        .then(specs => {
            allSpecs = specs;
            res.render('pages/mechSpec/mechanic-spec-form', {
                mechspec: {},
                formMode: 'createNew',
                allMechs: allMechs,
                allSpecs: allSpecs,
                pageTitle: 'Nowe Mechanik-Specjalizacja',
                btnLabel: 'Dodaj Mechanik-Specjalizacja',
                formAction: '/mechSpec/add',
                navLocation: 'mechSpec'
            });
        });
}

exports.showEditMechSpecForm = (req, res, next) => {
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
            // let a = allSpecs[0].spec.name.toString();
            // let b = mechspec.mec
            res.render('pages/mechSpec/mechanic-spec-form', {
                mechspec: {},
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

    // MechSpecRepository.getMechSpecById(mechSpecId)
    // MechanicRepository.getMechanics()
    //     .then(mechs => {
    //         allMechs = mechs;
    //         return SpecRepository.getSpecs();
    //     })
    //     .then(specs => {
    //         allSpecs = specs;
    //         res.render('pages/mechSpec/mechanic-spec-form', {
    //             mechspec: {},
    //             formMode: 'edit',
    //             allMechs: allMechs,
    //             allSpecs: allSpecs,
    //             pageTitle: 'Edycja Mechanik-Specjalizacja',
    //             btnLabel: 'Edytuj Mechanik-Specjalizacja',
    //             formAction: '/mechSpec/edit',
    //             navLocation: 'mechSpec'
    //         });
    //     });


exports.showMechSpecDetails = (req, res, next) => {
    let allMechs, allSpecs;
    const mechSpecId = req.params.mechSpecId;
    MechSpecRepository.getMechSpecById(mechSpecId)
    MechanicRepository.getMechanics()
        .then(mechs => {
            allMechs = mechs;
            return SpecRepository.getSpecs();
        })
        .then(specs => {
            allSpecs = specs;
            res.render('pages/mechSpec/mechanic-spec-form', {
                mechspec: {},
                formMode: 'showDetails',
                allMechs: allMechs,
                allSpecs: allSpecs,
                pageTitle: 'Szczegóły Mechanik-Specjalizacja',
                formAction: '',
                navLocation: 'mechSpec'
            });
        });
}

exports.addMechSpec = (req, res, next) => {
    const mechSpecData = { ...req.body };
    MechSpecRepository.createMechSpec(mechSpecData)
        .then( result => {
            res.redirect('/mechSpec');
        });
};

exports.updateMechSpec = (req, res, next) => {
    const mechSpecId = req.body._id;
    const mechSpecData = { ...req.body };
    MechSpecRepository.updateMechSpec(mechSpecId, mechSpecData)
        .then( result => {
            res.redirect('/mechSpec');
        });
};

exports.deleteMechSpec = (req, res, next) => {
    const mechSpecId = req.params.mechSpecId;
    MechSpecRepository.deleteMechSpec(mechSpecId)
        .then( (result) => {
            res.redirect('/mechSpec');
        });
};