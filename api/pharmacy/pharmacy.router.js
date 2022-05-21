const { login, createPharmacy, getPharmacyById } = require("./pharmacy.controller");
const router = require("express").Router();
const { checkToken } = require('../../auth/token_validator');

router.post("/",checkToken("create-pharmacy"), createPharmacy);
router.get("/:adminId", checkToken("get-pharmacy-by-id"), getPharmacyById);
router.post("/login",login)

module.exports = router;
