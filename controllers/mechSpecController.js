const MechanicRepository = require('../repository/mysql2/MechanicRepository');
const SpecRepository = require('../repository/mysql2/SpecRepository');
const MechSpecRepository = require('../repository/mysql2/MechSpecRepository');

exports.showMechSpecList = (req, res, next) => {
    MechSpecRepository.getMechSpecs()
        .then(mechspecs => {
            res.render('../views/pages/mechSpec/mechanic-spec-list', {
                mechspecs: mechspecs,
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
            res.render('../views/pages/mechSpec/mechanic-spec-form', {
                mechspec: {},
                formMode: 'createNew',
                allMechs: allMechs,
                allSpecs: allSpecs,
                pageTitle: 'Nowe Mechanik-Specjalizacja',
                btnLabel: 'Dodaj Mechanik-Specjalizacja',
                formAction: '/mechspecs/add',
                navLocation: 'mechSpec'
            });
        });
}

exports.showEditMechSpecForm = (req, res, next) => {
    const mechSpecId = req.params.mechSpecId;
    MechSpecRepository.getMechSpecById(mechSpecId)
        .then(mechspec => {
            res.render('../views/pages/mechSpec/mechanic-spec-form', {
                mech: mechspec,
                formMode: 'edit',
                pageTitle: 'Edycja Mechanik-Specjalizacja',
                btnLabel: 'Edytuj Mechanik-Specjalizacja',
                formAction: '/mechspecs/edit',
                navLocation: 'mechSpec'
            });
        });
};

exports.showMechSpecDetails = (req, res, next) => {
    const mechSpecId = req.params.mechSpecId;
    MechSpecRepository.getMechSpecById(mechSpecId)
        .then(mechspec => {
            res.render('../views/pages/mechSpec/mechanic-spec-form', {
                mechspec: mechspec,
                formMode: 'edit',
                pageTitle: 'Edycja Mechanik-Specjalizacja',
                btnLabel: 'Edytuj Mechanik-Specjalizacja',
                formAction: '/mechspecs/edit',
                navLocation: 'mechSpec'
            });
        });
}


exports.addMechSpec = (req, res, next) => {
    const mechSpecData = { ...req.body };
    MechSpecRepository.createMechSpec(mechSpecData)
        .then( result => {
            res.redirect('/mechspecs');
        });
};

exports.updateMechSpec = (req, res, next) => {
    const mechSpecId = req.body._id;
    const mechSpecData = { ...req.body };
    MechSpecRepository.updateMechSpec(mechSpecId, mechSpecData)
        .then( result => {
            res.redirect('/mechspecs');
        });
};

exports.deleteMechSpec = (req, res, next) => {
    const mechSpecId = req.params.mechSpecId;
    MechSpecRepository.deleteMechSpec(mechSpecId)
        .then( (result) => {
            res.redirect('/mechspecs');
        });
};