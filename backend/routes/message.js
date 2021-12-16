const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const messageCtrl = require("../controllers/message");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, messageCtrl.createMessage);
router.get("/", auth, messageCtrl.allMessages);
router.delete("/:id", auth, messageCtrl.deleteMessage);
router.put("/:id", auth, multer, messageCtrl.modifyMessage);

module.exports = router;
