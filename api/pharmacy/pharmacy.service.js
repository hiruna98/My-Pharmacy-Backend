const pool = require('../../config/db.config');

module.exports = {
    create: (data, password, callback) => {
        pool.query(
            `insert into pharmacy(name,owner,address,email,password) values(?,?,?,?,?)`,
            [
                data.name,
                data.owner,
                data.address,
                data.email,
                password
            ],
            (error, result, feilds)=>{
                if(error){
                    callback(error);
                }
                return callback(null, result)
            }
        )
    },
    getPharmacyById: (id,callback) => {
        pool.query(
            'select * from pharmacy where pharmacy_id = ? ',
            [id],
            (error, result, feilds)=>{
                if(error){
                    callback(error);
                }
                return callback(null, result[0])
            }
        )
    },
    getPharmacyByEmail: (email,callback) => {
        pool.query(
            'select * from pharmacy where email = ?',
            [
                email
            ],
            (error, result, feilds)=>{
                if(error){
                    callback(error);
                }
                return callback(null, result[0])
            }
        )
    },
}