const cors = require("cors");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");

const app = express();
const corsHandler = cors({ origin: true });
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();
app.use(corsHandler);

app.post("/user1/addPost", (req, res) => {
  const docRef = db
    .collection("users")
    .doc(req.body.userId)
    .collection("posts");
  docRef.add({
    imageUrl: req.body.imageUrl
  });
  res.send(200);
});

exports.widgets = functions.https.onRequest(app);
