const { ensureAuth } = require("../../middlewares/auth");

const router = require("express").Router();

// GET /dashboard
// Render dashboard page
router.get("/", ensureAuth, (req, res) => {
  try {
    // console.log(req.user);
    return res.status(200).json({
      success: 1,
      user: req.user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
