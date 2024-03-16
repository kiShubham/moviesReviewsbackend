const router = require("express").Router();

// import controller ;
const authController = require("../controllers/auth.controller");

//make routes ;
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
