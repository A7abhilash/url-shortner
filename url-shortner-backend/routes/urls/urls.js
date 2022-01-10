const router = require("express").Router();
const shortid = require("shortid");
const validUrl = require("valid-url");
const { ensureAuth } = require("../../middlewares/auth");
const {
  getUrlsByUserId,
  getUrlByShortId,
  addShortUrl,
  updateShortUrl,
  deleteShortUrl,
} = require("./urls.service");

// GET /urls
// Return user and his shortened urls
router.get("/", ensureAuth, (req, res) => {
  try {
    // console.log(req.user);
    getUrlsByUserId(req.user.uid, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          user: req.user,
          msg: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: 1,
        user: req.user,
        urls: results,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error", user: req.user });
  }
});

// POST /urls
// Shorten a new url
router.post("/", ensureAuth, (req, res) => {
  // console.log(req.body);
  try {
    const { long_url } = req.body;

    if (validUrl.isUri(long_url)) {
      const short_id = shortid.generate();
      const data = {
        short_id,
        long_url,
        uid: req.user.uid,
      };

      addShortUrl(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            msg: err.sqlMessage,
          });
        }

        return res.status(200).json({
          success: 1,
          msg: "Successfully shortened your long url!",
        });
      });
    } else {
      return res.status(404).json({ msg: "Invalid long url", success: 0 });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error", success: 0 });
  }
});

// PATCH /urls
// Edit shortened url as per user needs
router.patch("/", ensureAuth, (req, res) => {
  try {
    const { short_id, new_short_id } = req.body;

    getUrlByShortId(new_short_id, (_err, _result) => {
      if (_err) {
        console.log(_err);
        return res.status(500).json({
          success: 0,
          msg: err.sqlMessage,
        });
      }

      if (_result) {
        return res.status(404).json({
          success: 0,
          msg: "Short url is taken. Please try another!",
        });
      }

      getUrlByShortId(short_id, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            msg: err.sqlMessage,
          });
        }

        if (!result) {
          return res.status(404).json({
            success: 0,
            msg: "Failed to update short url, No such short id exists!",
          });
        }

        if (req.user.uid !== result.uid) {
          return res.status(404).json({
            success: 0,
            msg: "Failed to update short url, Unauthorized access!",
          });
        }

        updateShortUrl(short_id, new_short_id, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              msg: err.sqlMessage,
            });
          }

          return res.status(200).json({
            success: 1,
            msg: "Short url updated successfully!!!",
          });
        });
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error", success: 0 });
  }
});

// DELETE /urls
// Delete shortened url as per user wish
router.delete("/", ensureAuth, (req, res) => {
  try {
    const { short_id } = req.body;
    getUrlByShortId(short_id, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: err.sqlMessage,
        });
      }

      if (!result) {
        return res.status(404).json({
          success: 0,
          msg: "Failed to delete short url, No such short id exists!",
        });
      }

      if (req.user.uid !== result.uid) {
        return res.status(404).json({
          success: 0,
          msg: "Failed to update short url, Unauthorized access!",
        });
      }

      deleteShortUrl(short_id, (_err, result) => {
        if (_err) {
          console.log(_err);
          return res.status(500).json({
            success: 0,
            msg: _err.sqlMessage,
          });
        }

        return res.status(200).json({
          success: 1,
          msg: "Successfully deleted your short url!",
        });
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error", success: 0 });
  }
});

module.exports = router;
