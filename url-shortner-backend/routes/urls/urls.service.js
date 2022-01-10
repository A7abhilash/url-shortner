const pool = require("../../config/db");

module.exports = {
  addShortUrl: (data, callback) => {
    let created_date = `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`;

    const sql = `insert into urls values(
					"${data.short_id}",
					"${data.long_url}",
					${data.uid},
					0,
					"${created_date}"
				)`;

    pool.query(sql, (err, results) => {
      if (err) {
        return callback(err);
      }

      return callback(err, results);
    });
  },

  updateUrlVisitCount: (short_id, count, callback) => {
    const sql = `update urls set visits=${count} where short_id="${short_id}"`;
    pool.query(sql, () => callback());
  },

  updateShortUrl: (short_id, new_short_id, callback) => {
    const sql = `update urls set short_id="${new_short_id}" where short_id="${short_id}"`;
    pool.query(sql, (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(err, result[0]);
    });
  },

  deleteShortUrl: (short_id, callback) => {
    const sql = `delete from urls where short_id="${short_id}"`;
    pool.query(sql, (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(err, result[0]);
    });
  },

  getUrlByShortId: (short_id, callback) => {
    const sql = `select long_url,visits,uid from urls where short_id="${short_id}"`;
    pool.query(sql, (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(err, result[0]);
    });
  },

  getUrlsByUserId: (uid, callback) => {
    const sql = `select short_id, long_url, uid, visits, created_date from urls where uid=${uid}`;
    pool.query(sql, (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(err, result);
    });
  },
};
