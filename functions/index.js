const cors = require("cors");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");

const app = express();
const corsHandler = cors({ origin: true });
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();
app.use(corsHandler);

app.post("/addPost/:userId", async (req, res) => {
  const user = await admin.auth().verifyIdToken(req.headers.authorization);
  if (!user) {
    return res.send(403);
  }
  const docRef = db
    .collection("users")
    .doc(req.params.userId)
    .collection("posts");
  await docRef.add({
    imageUrl: req.body.imageUrl
  });
  return res.sendStatus(200);
});

app.get("/retrievePosts/:userId", async (req, res) => {
  const user = await admin.auth().verifyIdToken(req.headers.authorization);
  if (!user) {
    return res.send(403);
  }
  const postsRef = db
    .collection("users")
    .doc(req.params.userId)
    .collection("posts");
  const snapshot = await postsRef.get();
  let imageUrls = [];
  snapshot.forEach(doc => {
    imageUrls.push(doc.data().imageUrl);
  });
  return res.send(imageUrls);
});

exports.widgets = functions.https.onRequest(app);
