import * as firebase from "firebase/app";

const config = {
  apiKey: "AIzaSyD80Jo9A5YCOF9-MpzpgVbcwQimcxdYJto",
  authDomain: "instagram-feed-1a4be.firebaseapp.com",
  databaseURL: "https://instagram-feed-1a4be.firebaseio.com",
  projectId: "instagram-feed-1a4be",
  storageBucket: "instagram-feed-1a4be.appspot.com",
  messagingSenderId: "472923372747",
  appId: "1:472923372747:web:368b1bb83ce546ad196f4e"
};

firebase.initializeApp(config);

export default firebase;
