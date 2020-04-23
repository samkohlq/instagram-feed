const cors = require("cors");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");

const app = express();
const corsHandler = cors({ origin: true });
admin.initializeApp();
let db = admin.firestore();
app.use(corsHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    imageUrl: req.body.imageUrl,
    createdAt: Date.now(),
  });
  return res.sendStatus(200);
});

exports.widgets = functions.https.onRequest(app);
