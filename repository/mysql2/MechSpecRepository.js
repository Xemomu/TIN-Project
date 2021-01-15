const db = require('../../config/mysql2/db');
const mechSpecSchema = require("../../model/joi/MechSpec");


exports.getMechSpecs = () => {
    const query = `SELECT mechspec._id as mechspec_id,
                          mechspec.date,
                          mechspec.specLvl,
                          spec._id as spec_id,
                          spec.name,
                          spec.university,
                          m._id as mech_id,
                          m.firstName,
                          m.lastName,
                          m.birthDate,
                          m.salary
                   FROM MechSpec mechspec
                    left join Mechanic m on mechspec.mech_id = m._id
                    left join Spec spec on mechspec.spec_id = spec._id`
    return db.promise().query(query)
        .then((results, fields) => {
            const mechspecs = [];
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                const mechspec = {
                    _id: row.mechspec_id,
                    date: row.date,
                    specLvl: row.specLvl,
                    spec: {
                        _id: row.spec_id,
                        name: row.name,
                        university: row.university
                    },
                    mechanic: {
                        _id: row.mech_id,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        birthDate: row.birthDate,
                        salary: row.salary,
                    }
                };
                mechspecs.push(mechspec);
            }
            console.log(mechspecs);
            return mechspecs;
        })
        .catch(err => {
            console.log(err);
        });
};


exports.getMechSpecById = (mechSpecId) => {
    const query = `SELECT mechspec._id as mechspec_id,
                          mechspec.date,
                          mechspec.specLvl,
                          spec._id as spec_id,
                          spec.name,
                          spec.university,
                          m._id as mech_id,
                          m.firstName,
                          m.lastName,
                          m.birthDate,
                          m.salary
                   FROM MechSpec mechspec
                       left join Mechanic m on mechspec.mech_id = mech_id
                       left join Spec spec on mechspec.spec_id = spec._id
        where mechspec._id = ?`
    return db.promise().query(query, [mechSpecId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const mechspec = {
                _id: parseInt(mechSpecId),
                date: firstRow.date,
                specLvl: firstRow.specLvl,
                spec_id: firstRow.spec_id,
                name: firstRow.name,
                university: firstRow.university,
                mech_id: firstRow.mech_id,
                firstName: firstRow.firstName,
                lastName: firstRow.lastName,
                birthDate: firstRow.birthDate,
                salary: firstRow.salary,
            };
            console.log(mechspec);
            return mechspec;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createMechSpec = (newMechSpecData) => {
    const vRes = mechSpecSchema.validate(newMechSpecData, {abortEarly: false});
    if (vRes.error) {
        console.log("error returned " + vRes.error);
        return Promise.reject(vRes.error);
    }
    console.log('createMechSpecId');
    console.log(newMechSpecData);
    const sql = 'INSERT into MechSpec (mech_id, spec_id, date, specLvl) VALUES (?, ?, ?, ?)';
    return db.promise().execute(sql, [newMechSpecData.mechId, newMechSpecData.specId, newMechSpecData.date, newMechSpecData.specLvl]);
};

exports.updateMechSpec = (mechSpecId, mechSpecData) => {
    console.log('-------------')
    for (let i in mechSpecData){
        console.log(i + ': ' + mechSpecData[i])
    }
    console.log('-------------')
    const vRes = mechSpecSchema.validate(mechSpecData, {abortEarly: false});
    if (vRes.error) {
        console.log("error returned " + vRes.error);
        return Promise.reject(vRes.error);
    }
    const sql = `UPDATE MechSpec set mech_id = ?, spec_id = ?, date = ?, specLvl = ?
                 where _id = ?`;
    return db.promise().execute(sql, [mechSpecData.mechId, mechSpecData.specId, mechSpecData.date, mechSpecData.specLvl, mechSpecId]);
};

exports.deleteMechSpec = (mechSpecId) => {
    const sql = 'DELETE FROM MechSpec where _id = ?'
    return db.promise().execute(sql, [mechSpecId]);
};

exports.deleteManyMechSpecs = (mechSpecIds) => {
    const sql = 'DELETE FROM MechSpec where _id IN (?)'
    return db.promise().execute(sql, [mechSpecIds]);
};