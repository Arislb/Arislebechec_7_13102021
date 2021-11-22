const datab = require("../models/index");
const message = require("../models/message");

exports.createMessage = (req, res, next) => {
  // rajoute un espace dans la database.(revoir)
  const message = datab.Message.build({
    UserId: res.locals.userId,
    content: req.body.content,
  });
  message
    .save()
    .then(() => {
      datab.Message.findOne({
        where: { id: message.id },
        include: [
          {
            model: datab.User,
            attributes: ["username"],
          },
        ],
      })
        .then((message) => res.status(200).json(message))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.allMessages = (req, res, next) => {
  // Explore tout les elements d'une Database demandé.
  datab.Message.findAll({
    //lire la data a l'envers
    order: [["id", "DESC"]],
    //lier les id avec les pseudonyme
    include: [
      {
        model: datab.User,
        attributes: ["username"],
      },
    ],
  })
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteMessage = (req, res, next) => {
  datab.Message.findOne({ Where: { id: req.params.id } })
    .then((message) => {
      datab.Message.destroy({ where: { id: req.params.id } })
        .then(() => {
          //ICI SUN A DIT TU FOUS LE FS.UNlINK
          //const filename = message.attachment.split("/images/")[1];
          //fs.unlink(`images/${filename}`,
          res.status(200).json({ message: "Message supprimé !" });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
