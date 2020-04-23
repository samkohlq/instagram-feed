const chai = require("chai");
const request = require("supertest");
const sinon = require("sinon");
const admin = require("firebase-admin");
// import testing library
const test = require("firebase-functions-test")(
  // configuration for test project
  // TODO(samkohlq): make these secret
  {
    databaseURL: "https://instagram-feed-tests.firebaseio.com",
    storageBucket: "instagram-feed-tests.appspot.com",
    projectId: "instagram-feed-tests"
  },
  "./test/instagram-feed-tests-85bdcabbf52c.json"
);
const assert = chai.assert;

describe("Cloud Functions", () => {
  let db;
  let myFunctions;
  let verifyIdTokenStub;

  before(() => {
    // import functions from index.js
    myFunctions = require("../index.js");
    // no need to initialize app as it's already been initialized in functions/index.js
    db = admin.firestore();
  });

  beforeEach(() => {
    verifyIdTokenStub = sinon
      .stub(admin.auth(), "verifyIdToken")
      .resolves(true);
  });

  afterEach(() => {
    verifyIdTokenStub.restore();
  });

  after(() => {
    // clean up data after tests
    test.cleanup();
  });

  describe("addPost", () => {
    it("createPost API creates document post under user that has logged in", async () => {
      const addPostResponse = await request(myFunctions.widgets)
        .post("/addPost/user1")
        .send({
          userId: "user1",
          image: "screenshot.png",
          imageUrl: "#somelink"
        })
        .set("Accept", "application/json");
      assert.equal(addPostResponse.status, 200);
      const snapshot = await db
        .collection("users")
        .doc("user1")
        .collection("posts")
        .get();
      const imageUrl = snapshot.docs[0].get("imageUrl");
      console.log(`imageUrl object: ${imageUrl}`);
      assert.equal(imageUrl, "#somelink");
    });
  });
});
