const datab = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//logique d'engeristement signup et hashage du mot de passe.
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = datab.User.build({
        email: req.body.email,
        username: req.body.username,
        password: hash,
        isAdmin: 0,
      });
      user
        .save()
        .then(() =>
          res.status(201).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            email: user.email,
            username: user.username,
            token: jwt.sign(
              { userId: user.id, isAdmin: user.isAdmin },
              process.env.TOKEN,
              {
                expiresIn: "24h",
              }
            ),
            message: "Utilisateur créé !",
          })
        )

        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  datab.User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }

          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            email: user.email,
            username: user.username,
            token: jwt.sign({ userId: user.id }, process.env.TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.modifyUser = (req, res, next) => {
  datab.User.update(
    //L'element viser d'abord puis le l'endroit
    { username: req.body.username, email: req.body.email },
    { where: { id: res.locals.userId } }
  );
  datab.User.findOne({ where: { id: res.locals.userId } })
    .then((user) =>
      res.status(200).json({
        message: "profil modifié !",
        isAdmin: user.isAdmin,
        email: user.email,
        username: user.username,
        token: jwt.sign({ userId: user.id }, process.env.TOKEN, {
          expiresIn: "24h",
        }),
      })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.getUser = (req, res, next) => {
  datab.User.findOne({ where: { id: res.locals.userId } })
    .then((user) =>
      res.status(200).json({
        message: "profil modifié !",
        isAdmin: user.isAdmin,
        email: user.email,
        username: user.username,
        token: jwt.sign({ userId: user.id }, process.env.TOKEN, {
          expiresIn: "24h",
        }),
      })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  datab.User.findOne({ Where: { id: res.locals.userId } })
    .then((user) => {
      datab.User.destroy({ where: { id: res.locals.userId } })
        .then(() => {
          res.status(200).json({ message: "Utilisateur supprimé !" });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
