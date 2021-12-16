const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

//const helmet = require("helmet");
//const hpp = require("hpp");

//Import des routes utilisé
const messageRoutes = require("./routes/message");
const userRoutes = require("./routes/user");

const app = express();

// rajout a l'entête des headers pour autoriser tout le monde  d'utiliser l'API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Sécurité
//app.use(helmet());
//app.use(hpp());

//destination des images
app.use("/images", express.static(path.join(__dirname, "images")));

//enregistrement des Applications utilisé
app.use("/api/auth", userRoutes);
app.use("/api/message", messageRoutes);

app.use((req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
});

module.exports = app;
