const MechanicRepository = require('../repository/mysql2/MechanicRepository');


exports.showMechanicList = (req, res, next) => {
    MechanicRepository.getMechanics()
        .then(mechs => {
            res.render('pages/mechanic/mechanic-list', {
                mechs: mechs,
                navLocation: 'mechanic'
            });
        });
}

exports.showAddMechanicForm = (req, res, next) => {
    const validationErrors = []
    res.render('pages/mechanic/mechanic-form', {
        mech: {},
        pageTitle: 'Nowy mechanik',
        formMode: 'createNew',
        btnLabel: 'Dodaj mechanika',
        formAction: '/mechanics/add',
        navLocation: 'mechanic',
        validationErrors: validationErrors
    });
}

exports.showEditMechanicForm = (req, res, next) => {
    const validationErrors = []
    const mechId = req.params.mechId;
    let mechspecs;
    MechanicRepository.getMechMechSpec(mechId)
        .then(mechs => {
            mechspecs = mechs;
            return MechanicRepository.getMechanicById(mechId)
        }).then(mech => {
            res.render('pages/mechanic/mechanic-form', {
                mech: mech,
                mechId: mechId,
                mechspecs: mechspecs,
                formMode: 'edit',
                pageTitle: 'Edycja mechanika',
                btnLabel: 'Edytuj mechanika',
                formAction: '/mechanics/edit',
                navLocation: 'mechanic',
                validationErrors: validationErrors
            });
        });
};


exports.showMechanicDetails = (req, res, next) => {
    const validationErrors = []
    const mechId = req.params.mechId;
    MechanicRepository.getMechanicById(mechId)
        .then(mech => {
            res.render('pages/mechanic/mechanic-form', {
                mech: mech,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły mechanika',
                formAction: '',
                navLocation: 'mechanic',
                validationErrors: validationErrors
            });
        });
}

exports.addMechanic = (req, res, next) => {
    const mechData = { ...req.body };

    MechanicRepository.createMechanic(mechData)
        .then( result => {
            res.redirect('/mechanics');
        }).catch(err => {
        console.log(err.details);
        res.render('pages/mechanic/mechanic-form', {
            mech: mechData,
            pageTitle: 'Dodawanie mechanika',
            formMode: 'createNew',
            btnLabel: 'Dodaj mechanika',
            formAction: '/mechanics/add',
            navLocation: 'mechanic',
            validationErrors: err.details
        });
    });
};

exports.updateMechanic = (req, res, next) => {
    const mechId = req.body._id;
    const mechData = { ...req.body };

    MechanicRepository.updateMechanic(mechId, mechData)
        .then( result => {
            res.redirect('/mechanics');
        })
        .catch(err => {

            console.log(err.details);
            res.render('pages/mechanic/mechanic-form', {
                mech: mechData,
                formMode: 'edit',
                pageTitle: 'Edycja mechanika',
                btnLabel: 'Edytuj mechanika',
                formAction: '/mechanics/edit',
                navLocation: 'mechanic',
                validationErrors: err.details
            });
    });
};

exports.deleteMechanic = (req, res, next) => {
    const mechId = req.params.mechId;
    MechanicRepository.deleteMechanic(mechId)
        .then( (result) => {
            res.redirect('/mechanics');
        });
};