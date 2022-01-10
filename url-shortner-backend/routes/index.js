const router = require("express").Router();
const pool = require("../config/db");

// create database url_shortener
router.get("/create-database", (req, res) => {
  try {
    const sql = "create database url_shortener";
    pool.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: err.sqlMessage,
        });
      }
      return res.status(200).json({
        success: 1,
        msg: "New database 'url_shortener' created!!!",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: 0, msg: "Server error" });
  }
});

// create table users
router.get("/create-table-users", (req, res) => {
  try {
    const sql = `create table users (
		uid INT NOT NULL AUTO_INCREMENT,
		firstName VARCHAR(45),
		lastName VARCHAR(45),
		email VARCHAR(45) UNIQUE NOT NULL,
		password VARCHAR(100),
		PRIMARY KEY (uid, email)
		)`;
    pool.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: err.sqlMessage,
        });
      }
      return res.status(200).json({
        success: 1,
        msg: "New table 'url_shortener.users' created!!!",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: 0, msg: "Server error" });
  }
});

// create table urls
router.get("/create-table-urls", (req, res) => {
  try {
    const sql = `create table urls (
		short_id VARCHAR(30) PRIMARY KEY NOT NULL,
		long_url VARCHAR(45),
		uid INT,
		created_date DATE,
		FOREIGN KEY (uid) REFERENCES users(uid)
		)`;
    pool.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: err.sqlMessage,
        });
      }
      return res.status(200).json({
        success: 1,
        msg: "New table 'url_shortener.urls' created!!!",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: 0, msg: "Server error" });
  }
});

module.exports = router;
