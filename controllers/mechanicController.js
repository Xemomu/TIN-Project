const MechanicRepository = require('../repository/mysql2/MechanicRepository');


exports.showMechanicList = (req, res, next) => {
    MechanicRepository.getMechanics()
        .then(mechanics => {
            res.render('pages/mechanic/mechanic-list', {
                mechanics: mechanics,
                navLocation: 'mechanic'
            });
        });
}

exports.showAddMechanicForm = (req, res, next) => {
    const validationErrors = []
    res.render('pages/mechanic/mechanic-form', {
        mechanic: {},
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
    const mech_id = req.params.mech_id;

    MechanicRepository.getMechanicById(mech_id)
        .then(mech => {
        res.render('pages/mechanic/mechanic-form', {
            mechanic: mech,
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
    const mech_id = req.params.mech_id;
    MechanicRepository.getMechanicById(mech_id)
        .then(mech => {
            res.render('pages/mechanic/mechanic-form', {
                mechanic: mech,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły mechanika',
                formAction: '',
                navLocation: 'mechanic',
                validationErrors: validationErrors
            });
        });
}

exports.addMechanic = (req, res, next) => {
    const mechData = {...req.body};

    MechanicRepository.createMechanic(mechData)
        .then(result => {
            res.redirect('/mechanics');
        }).catch(err => {
        console.log(err.details);
        res.render('pages/mechanic/mechanic-form', {
            mechanic: mechData,
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
    const mech_id = req.body._id;
    const mechData = {...req.body};
    
    MechanicRepository.updateMechanic(mech_id, mechData)
        .then(result => {
            res.redirect('/mechanics');
        })
        .catch(err => {
            return MechanicRepository.getMechanicById(mech_id)
            .then(mech => {
            console.log(err.details);
            res.render('pages/mechanic/mechanic-form', {
                mechanic: mech,
                pageTitle: 'Edycja mechanika',
                formMode: 'edit',
                btnLabel: 'Edytuj mechanika',
                formAction: '/mechanics/edit',
                navLocation: 'mechanic',
                validationErrors: err.details
            });
        });
    });
};

exports.deleteMechanic = (req, res, next) => {
    const mech_id = req.params.mech_id;
    MechanicRepository.deleteMechanic(mech_id)
        .then((result) => {
            res.redirect('/mechanics');
        });
};