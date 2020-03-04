const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

app.post("/hello", (req, res) => {
  let docRef = db.collection("users").doc(req.body.user);
  docRef.set({
    image: req.body.image
  });
  const newPost = {
    image: req.body.image
  };
  res.send(newPost);
});

exports.widgets = functions.https.onRequest(app);