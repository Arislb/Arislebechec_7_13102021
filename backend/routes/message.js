const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const messageCtrl = require("../controllers/message");

router.post("/", auth, messageCtrl.createMessage);
router.get("/", auth, messageCtrl.allMessages);
//rajouté l'auth après la fin des tests pour la route delete et modify
router.delete("/:id", auth, messageCtrl.deleteMessage);
router.put("/:id", auth, messageCtrl.modifyMessage);

module.exports = router;
