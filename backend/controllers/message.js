const datab = require("../models/index");

exports.createMessage = (req, res, next) => {
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
