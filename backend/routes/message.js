const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const messageCtrl = require("../controllers/message");

router.post("/", auth, messageCtrl.createMessage);
router.get("/", auth, messageCtrl.allMessages);

module.exports = router;
