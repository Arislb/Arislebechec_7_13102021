const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.put("/", auth, userCtrl.modifyUser);
router.get("/", auth, userCtrl.getUser);
router.delete("/", auth, userCtrl.deleteUser);

module.exports = router;
