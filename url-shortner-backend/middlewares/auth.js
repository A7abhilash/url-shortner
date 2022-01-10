const { verify } = require("jsonwebtoken");
const { getUserById } = require("../routes/auth/auth.service");

module.exports = {
  ensureAuth: (req, res, next) => {
    let token = req.get("authorization");

    if (!token) {
      return res.status(400).json({
        success: 0,
        msg: "Access denied, Unauthorized access!",
      });
    }

    token = token.slice(7); //remove "Bearer "

    verify(token, process.env.JWT_KEY, (err, payload) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          msg: "Session Expired, Please login again!",
        });
      }

      //   console.log(payload.result);

      getUserById(payload.result.uid, (_err, result) => {
        if (_err) {
          console.log(_err);
          return res.status(400).json({
            success: 0,
            msg: "DB Connection error!",
          });
        }

        if (!result) {
          return res.status(400).json({
            success: 0,
            msg: "Session Expired, Please login again!",
          });
        }

        delete result.password;
        req.user = result;
        next();
      });
    });
  },
};
