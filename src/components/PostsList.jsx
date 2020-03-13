import { GridList } from "@material-ui/core";
import * as firebase from "firebase";
import React from "react";
import Post from "./Post";

const db = firebase.firestore();
class PostsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  // when PostsList component mounts
  componentDidMount() {
    // onAuthStateChanged runs whenever user has logged in or out
    firebase.auth().onAuthStateChanged(user => {
      // if a user has logged in
      if (user) {
        // point to posts collection
        let collectionRef = db
          .collection("users")
          .doc(user.uid)
          .collection("posts");
        collectionRef.onSnapshot(collectionSnapshot => {
          // create an empty array
          const imageUrls = [];
          // add each document's imageUrl to array
          collectionSnapshot.forEach(doc => {
            imageUrls.push(doc.data().imageUrl);
          });
          // set imageUrls array to state
          this.setState({
            posts: imageUrls
          });
        });
      }
    });
  }

  render() {
    const images = this.state.posts[0] ? (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          overflow: "hidden"
        }}
      >
        <GridList cellHeight={400} cols={3}>
          {this.state.posts.map((imageUrl, i) => (
            <Post key={i} src={imageUrl} />
          ))}
        </GridList>
      </div>
    ) : (
      <h4 className="my-5">Upload an image to get started!</h4>
    );
    return <div>{images}</div>;
  }
}

export default PostsList;
