const datab = require("../models/index");
const message = require("../models/message");
const fs = require("fs");

exports.createMessage = (req, res, next) => {
  // Ajouter une image
  let attachment;
  if (req.file) {
    attachment = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }

  // rajoute un espace dans la database.(revoir)
  const message = datab.Message.build({
    UserId: res.locals.userId,
    content: req.body.content,
    attachment: attachment,
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
  let params = { id: req.params.id };
  if (!res.locals.isAdmin) {
    params.UserId = res.locals.userId;
  }
  datab.Message.findOne({
    where: params,
  })
    .then((message) => {
      datab.Message.destroy({
        where: { id: req.params.id },
      })
        .then(() => {
          const fileName = message.attachment.split("/images/")[1];
          if (fs.existsSync(`images/${fileName}`)) {
            fs.unlinkSync(`images/${fileName}`);
          }
          res.status(200).json({ message: "Message supprimé !" });
        })

        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyMessage = (req, res, next) => {
  let params = { id: req.params.id };
  if (!res.locals.isAdmin) {
    params.UserId = res.locals.userId;
  }
  datab.Message.update(
    //L'element viser d'abord puis le l'endroit
    { content: req.body.content },
    { where: params }
  ).then(() => res.status(200).json({ message: "Message modifié !" }));
  //.catch((error) => res.status(400).json({ error }));
};
