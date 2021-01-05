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
    res.render('pages/mechanic/mechanic-form', {
        mech: {},
        pageTitle: 'Nowy mechanik',
        formMode: 'createNew',
        btnLabel: 'Dodaj mechanika',
        formAction: '/mechanics/add',
        navLocation: 'mechanic'
    });
}

exports.showEditMechanicForm = (req, res, next) => {
    const mechId = req.params.mechId;
    MechanicRepository.getMechanicById(mechId)
        .then(mech => {
            res.render('pages/mechanic/mechanic-form', {
                mech: mech,
                formMode: 'edit',
                pageTitle: 'Edycja mechanika',
                btnLabel: 'Edytuj mechanika',
                formAction: '/mechanics/edit',
                navLocation: 'mechanic'
            });
        });
};


exports.showMechanicDetails = (req, res, next) => {
    const mechId = req.params.mechId;
    MechanicRepository.getMechanicById(mechId)
        .then(mech => {
            res.render('pages/mechanic/mechanic-form', {
                mech: mech,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły mechanika',
                formAction: '',
                navLocation: 'mechanic'
            });
        });
}

exports.addMechanic = (req, res, next) => {
    const mechData = { ...req.body };
    MechanicRepository.createMechanic(mechData)
        .then( result => {
            res.redirect('/mechanics');
        });
};

exports.updateMechanic = (req, res, next) => {
    const mechId = req.body._id;
    const mechData = { ...req.body };
    MechanicRepository.updateMechanic(mechId, mechData)
        .then( result => {
            res.redirect('/mechanics');
        });
};

exports.deleteMechanic = (req, res, next) => {
    const mechId = req.params.mechId;
    MechanicRepository.deleteMechanic(mechId)
        .then( (result) => {
            res.redirect('/mechanics');
        });
};

