const datab = require("../models/index");

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
