const pool = require("../../config/db");

module.exports = {
  createUser: (data, callback) => {
    const sql = `insert into users (firstName, lastName, email, password) values (?,?,?,?)`;
    pool.query(
      sql,
      [data.firstName, data.lastName, data.email, data.password],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

  updateUser: (data, id, callback) => {
    const sql = `update users set firstName=?, lastName=?, email=?, password=? where id=?`;
    pool.query(
      sql,
      [data.firstName, data.lastName, data.email, data.password, id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

  getUserById: (id, callback) => {
    const sql = `select id, firstName, lastName, email, password from users where id=${id}`;
    pool.query(sql, (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(err, result[0]);
    });
  },

  getUserByEmail: (email, callback) => {
    const sql = `select id, firstName, lastName, email, password from users where email="${email}"`;
    pool.query(sql, (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(err, result[0]);
    });
  },
};
