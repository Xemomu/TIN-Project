const db = require('../../config/mysql2/db');
const specSchema = require('../../model/joi/Spec');


exports.getSpecs = () => {
    return db.promise().query('SELECT * FROM Spec')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getSpecMechSpec = (specId) => {
    const query = `SELECT *
                   FROM MechSpec
                   WHERE spec_id = ?`;
    return db.promise().query(query, [specId])
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

exports.getSpecById = (specId) => {
    const query = `SELECT spec._id as _id, spec.name, spec.university, mechspec._id as mechspec_id,
        mechspec.date, mechspec.specLvl, m._id as mech_id, m.firstName, m.lastName, m.birthDate, m.salary
                   FROM Spec spec
                       left join MechSpec mechspec
                   on mechspec.spec_id = spec._id
                       left join Mechanic m on mechspec.mech_id = m._id
                   where spec._id = ?`
    return db.promise().query(query, [specId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            // noinspection UnnecessaryLocalVariableJS
            const spec = {
                _id: parseInt(specId),
                name: firstRow.name,
                university: firstRow.university,
                mechspecs: []
            }
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.mechspec_id) {
                    const mechspec = {
                        _id: row.mechspec_id,
                        date: row.date,
                        specLvl: row.specLvl,
                        mechanic: {
                            _id: row.mech_id,
                            firstName: firstRow.firstName,
                            lastName: firstRow.lastName,
                            birthDate: firstRow.birthDate,
                            salary: firstRow.salary,
                        }
                    };
                    spec.mechspecs.push(mechspec);
                }
            }
            return spec;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createSpec = (newSpecData) => {
    const vRes = specSchema.validate(newSpecData, {abortEarly: false});
    if (vRes.error) {
        console.log("error returned " + vRes.error);
        return Promise.reject(vRes.error);
    }
    const name = newSpecData.name;
    const university = newSpecData.university;
    const sql = 'INSERT into Spec (name, university) VALUES (?, ?)'
    return db.promise().execute(sql, [name, university]);
};

exports.updateSpec = (specId, specData) => {
    const name = specData.name;
    const university = specData.university;
    const sql = `UPDATE Spec
                 set name = ?,
                university = ?
                 where _id = ?`;
    return db.promise().execute(sql, [name, university, specId]);
};

exports.deleteSpec = (specId) => {
    const sql1 = 'DELETE FROM MechSpec where spec_id = ?'
    const sql2 = 'DELETE FROM Spec where _id = ?'

    return db.promise().execute(sql1, [specId])
        .then(() => {
            return db.promise().execute(sql2, [specId])
        });
};

