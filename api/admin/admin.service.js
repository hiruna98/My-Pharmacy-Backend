const pool = require('../../config/db.config');

module.exports = {
    create: (data, callback) => {
        pool.query(
            `insert into admin(fname,lname,email,password) values(?,?,?,?)`,
            [
                data.fname,
                data.lname,
                data.email,
                data.password
            ],
            (error, result, feilds)=>{
                if(error){
                    callback(error);
                }
                return callback(null, result)
            }
        )
    },
    getAdminById: (id,callback) => {
        pool.query(
            'select * from admin where admin_id = ? ',
            [id],
            (error, result, feilds)=>{
                if(error){
                    callback(error);
                }
                return callback(null, result[0])
            }
        )
    },
    getAdminByEmail: (email,callback) => {
        pool.query(
            'select * from admin where email = ?',
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