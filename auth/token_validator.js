const jwt = require("jsonwebtoken");

module.exports = {
  checkToken: (posibleAction) => {
    return (req, res, next) => {
      let token = req.get("authorization");
      if (token) {
        token = token.slice(7);
        jwt.verify(token, "abc123", (err, decoded) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Token Expire",
            });
          } else {
            let actions = decoded.actions;
            if(actions.includes(posibleAction)){
              next();
            }else{
              res.status(400).json({
                success: 0,
                message: "Access denied",
              });
            }
          }
        });
      } else {
        res.status(400).json({
          success: 0,
          message: "Access denied",
        });
      }
    };
  },
};
