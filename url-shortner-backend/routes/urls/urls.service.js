const pool = require("../../config/db");

module.exports = {
  getUrlByShortId: (short_id, callback) => {
    const sql = `select long_url from urls where short_id="${short_id}"`;
    pool.query(sql, (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(err, result[0]);
    });
  },

  getUrlsByUserId: (uid, callback) => {
    const sql = `select short_id, long_url, uid, date from urls where uid=${uid}`;
    pool.query(sql, (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(err, result);
    });
  },
};
