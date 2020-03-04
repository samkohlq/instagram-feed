const functions = require("firebase-functions");
const express = require("express");

const app = express();

app.post("/hello", (req, res) => {
  const newPost = {
    image: req.body.image
  };
  res.send(newPost);
});

exports.widgets = functions.https.onRequest(app);
