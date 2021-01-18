const db = require('../../config/mysql2/db');
const mechSchema = require("../../model/joi/Mechanic");

exports.getMechanics = () => {
    return db.promise().query('SELECT * FROM Mechanic')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getMechMechSpec = (mech_id) => {
    const query = `SELECT *
                   FROM MechSpec
                   WHERE mech_id = ?`;
    return db.promise().query(query, [mech_id])
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

exports.getMechanicById = (mech_id) => {
    const query = `SELECT m._id as _id, m.firstName, m.lastName, m.birthDate, m.salary, mechspec._id as mechspec_id,
        mechspec.date, mechspec.specLvl, spec._id as spec_id, spec.name, spec.university
                   FROM Mechanic m
                       left join MechSpec mechspec
                   on mechspec.mech_id = m._id
                       left join Spec spec on mechspec.spec_id = spec._id
                   where m._id = ?`
    return db.promise().query(query, [mech_id])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const mechanic = {
                _id: parseInt(mech_id),
                firstName: firstRow.firstName,
                lastName: firstRow.lastName,
                birthDate: firstRow.birthDate,
                salary: firstRow.salary,
                mechspecs: [],
            }
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.mechspec_id) {
                    const mechspec = {
                        _id: row.mechspec_id,
                        date: row.date,
                        specLvl: row.specLvl,
                        spec: {
                            _id: row.spec_id,
                            name: row.name,
                            university: row.university,
                        }
                    };
                    mechanic.mechspecs.push(mechspec);
                }
            }
            return mechanic;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createMechanic = (newMechData) => {
    const vRes = mechSchema.validate(newMechData, {abortEarly: false});
    if (vRes.error) {
        console.log("error returned " + vRes.error);
        return Promise.reject(vRes.error);
    }
    const firstName = newMechData.firstName;
    const lastName = newMechData.lastName;
    const birthDate = newMechData.birthDate;
    const salary = newMechData.salary;

    const sql = 'INSERT INTO Mechanic (firstName, lastName, birthDate, salary) VALUES (?, ?, ?, ?)'
    return db.promise().execute(sql, [firstName, lastName, birthDate, salary]);
};

exports.updateMechanic = (mech_id, mechData) => {
    const vRes = mechSchema.validate(mechData, {abortEarly: false});
    if (vRes.error) {
        console.log("error returned " + vRes.error);
        return Promise.reject(vRes.error);
    }
    const firstName = mechData.firstName;
    const lastName = mechData.lastName;
    const birthDate = mechData.birthDate;
    const salary = mechData.salary;

    const sql = `UPDATE Mechanic
                 set firstName = ?,
                     lastName  = ?,
                     birthDate = ?,
                     salary    = ?
                 where _id = ?`;
    return db.promise().execute(sql, [firstName, lastName, birthDate, salary, mech_id]);
};

exports.deleteMechanic = (mech_id) => {
    const sql1 = 'DELETE FROM MechSpec where mech_id = ?'
    const sql2 = 'DELETE FROM Mechanic where _id = ?'

    return db.promise().execute(sql1, [mech_id])
        .then(() => {
            return db.promise().execute(sql2, [mech_id])
        });
};