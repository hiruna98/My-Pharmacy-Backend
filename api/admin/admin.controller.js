const { create, getAdminByEmail, getAdminById } = require("./admin.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userActions = require("../../config/user_actions.json");

module.exports = {
  createAdmin: (req, res) => {
    const body = req.body;
    body.password = bcrypt.hashSync(body.password, 10);
    create(body, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: result,
      });
    });
  },
  getAdminById: (req, res) => {
    const id = req.params.adminId;
    getAdminById(id, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Connection error",
        });
      }
      if (!result) {
        return res.status(404).json({
          success: 0,
          message: "Record Not Found",
        });
      }
      result.password = undefined;
      return res.status(200).json({
        success: 1,
        data: result,
      });
    });
  },
  login: (req, res) => {
    const email = req.body.email;
    const pwd = req.body.password;
    getAdminByEmail(email, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Connection error",
        });
      }
      if (!result) {
        return res.status(400).json({
          success: 0,
          message: "Invalid Credentials",
        });
      }
      const isMatched = bcrypt.compareSync(pwd, result.password);
      if (isMatched) {
        result.password = undefined;
        const token = jwt.sign({ user: result, actions: userActions.admin}, "abc123", {
          expiresIn: "2h",
        });
        return res.status(200).json({
          success: 1,
          data: token,
        });
      } else {
        return res.status(400).json({
          success: 0,
          message: "Invalide email or password",
        });
      }
    });
  },
};
