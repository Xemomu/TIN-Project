const db = require('../../config/mysql2/db');

exports.getSpecs = () => {
    return db.promise().query('SELECT * FROM Spec')
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getSpecById = (specId) => {
    const query = `SELECT spec._id as _id, spec.name, spec.university, mechspec._id as mechspec_id,
        mechspec.date, mechspec.specLvl, m._id as mech_id, m.firstName, m.lastName, m.birthDate, m.salary
    FROM Spec spec 
    left join MechSpec mechspec on mechspec._id = spec._id
    left join Mechanic m on mechspec._id = m._id 
    where spec._id = ?`
    return db.promise().query(query, [specId])
        .then( (results, fields) => {
            const firstRow = results[0][0];
            if(!firstRow) {
                return {};
            }
            const spec = {
                _id: parseInt(specId),
                _id: firstRow.spec_id,
                name: firstRow.name,
                university: firstRow.university,
                mechSpecs: []
            }
            for( let i=0; i<results[0].length; i++ ) {
                const row = results[0][i];
                if(row.mechspec_id) {
                    const mechspec = {
                        _id: row.mechspec_id,
                        date: row.date,
                        specLvl: row.specLvl,
                        mech: {
                            firstName: firstRow.firstName,
                            lastName: firstRow.lastName,
                            birthDate: firstRow.birthDate,
                            salary: firstRow.salary,
                        }
                    };
                    spec.mechSpecs.push(mechspec);
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
    const name = newSpecData.name;
    const university = newSpecData.university;
    const sql = 'INSERT into Spec (name, university) VALUES (?, ?)'
    return db.promise().execute(sql, [name, university]);
};

exports.updateSpec = (specId, specData) => {
    const name = specData.name;
    const university = specData.university;
    const sql = `UPDATE Spec set name = ?, university = ? where _id = ?`;
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
