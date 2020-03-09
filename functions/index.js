const cors = require("cors");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");

const app = express();
const corsHandler = cors({ origin: true });
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();
app.use(corsHandler);

app.post("/addPost", (req, res) => {
  const docRef = db
    .collection("users")
    .doc(req.body.userId)
    .collection("posts");
  docRef.add({
    imageUrl: req.body.imageUrl
  });
  res.sendStatus(200);
});

app.get("/retrievePosts/:userId", (req, res) => {
  console.log(req.params.userId);
  const postsRef = db
    .collection("users")
    .doc(req.params.userId)
    .collection("posts");
  postsRef
    .get()
    .then(snapshot => {
      let imageUrls = [];
      snapshot.forEach(doc => {
        imageUrls.push(doc.data().imageUrl);
      });
      return res.send(imageUrls);
    })
    .catch(err => {
      console.log("Error getting image urls", err);
    });
});

exports.widgets = functions.https.onRequest(app);
