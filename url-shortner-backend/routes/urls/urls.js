const { ensureAuth } = require("../../middlewares/auth");
const { getUrlsByUserId } = require("./urls.service");

const router = require("express").Router();

// GET /urls
// Return user and his shortened urls
router.get("/", ensureAuth, (req, res) => {
  try {
    // console.log(req.user);

    getUrlsByUserId(req.user.id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          user: req.user,
          msg: err.sqlMessage,
        });
      }
    });

    return res.status(200).json({
      success: 1,
      user: req.user,
      urls: results,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error", user: req.user });
  }
});

module.exports = router;
