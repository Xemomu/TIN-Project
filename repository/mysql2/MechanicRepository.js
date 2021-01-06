const db = require('../../config/mysql2/db');

exports.getMechanics = () => {
    return db.promise().query('SELECT * FROM Mechanic')
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getMechanicById = (mechId) => {
    const query = `SELECT m._id as _id, m.firstName, m.lastName, m.birthDate, m.salary, mechspec._id as mechspec_id,
        mechspec.date, mechspec.specLvl, spec._id as spec_id, spec.name, spec.university 
    FROM Mechanic m 
    left join MechSpec mechspec on mechspec._id = m._id
    left join Spec spec on mechspec._id = spec._id 
    where m._id = ?`
    return db.promise().query(query, [mechId])
        .then( (results, fields) => {
            const firstRow = results[0][0];
            if(!firstRow) {
                return {};
            }
            const mech = {
                _id: parseInt(mechId),
                firstName: firstRow.firstName,
                lastName: firstRow.lastName,
                birthDate: firstRow.birthDate,
                salary: firstRow.salary,
                mechspecs: []
            }
            for( let i=0; i<results[0].length; i++ ) {
                const row = results[0][i];
                if(row.mechspec_id) {
                    const mechspec = {
                        _id: row.mechspec_id,
                        date: row.date,
                        specLvl: row.specLvl,
                        spec: {
                            _id: row.spec_id,
                            name: row.name,
                            university: row.university
                        }
                    };
                    mech.mechSpecs.push(mechspec);
                }
            }
            return mech;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createMechanic = (newMechData) => {
    const firstName = newMechData.firstName;
    const lastName = newMechData.lastName;
    const birthDate = newMechData.birthDate;
    const salary = newMechData.salary;
    const sql = 'INSERT INTO Mechanic (firstName, lastName, birthDate, salary) VALUES (?, ?, ?, ?)'
    return db.promise().execute(sql, [firstName, lastName, birthDate, salary]);
};

exports.updateMechanic = (mechId, mechData) => {
    const firstName = mechData.firstName;
    const lastName = mechData.lastName;
    const birthDate = mechData.birthDate;
    const salary = mechData.salary;
    const sql = `UPDATE Mechanic set firstName = ?, lastName = ?, birthDate = ?, salary = ? where _id = ?`;
    return db.promise().execute(sql, [firstName, lastName, birthDate, salary, mechId]);
};

exports.deleteMechanic = (mechId) => {
    const sql1 = 'DELETE FROM MechSpec where mech_id = ?'
    const sql2 = 'DELETE FROM Mechanic where _id = ?'

    return db.promise().execute(sql1, [mechId])
        .then(() => {
            return db.promise().execute(sql2, [mechId])
        });
};

