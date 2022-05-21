const { login, createAdmin, getAdminById } = require("./admin.controller");
const router = require("express").Router();
const { checkToken } = require('../../auth/token_validator');

router.post("/",checkToken("create-admin"), createAdmin);
router.get("/:adminId", checkToken("get-admin-by-id"), getAdminById);
router.post("/login",login)

module.exports = router;
