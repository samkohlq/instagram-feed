import * as firebase from "firebase";
import React from "react";
import { ListGroup } from "react-bootstrap";
import Post from "./Post";

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
        // gets token to prove to backend that request is legitimate
        user.getIdToken(true).then(idToken => {
          fetch(
            `https://us-central1-instagram-feed-1a4be.cloudfunctions.net/widgets/retrievePosts/${user.uid}`,
            // `http://localhost:5001/instagram-feed-1a4be/us-central1/widgets/retrievePosts/${user.uid}`,
            {
              method: "GET",
              headers: {
                Authorization: idToken
              }
            }
          )
            .then(response => {
              return response.json();
            })
            .then(imageUrls => {
              return this.setState({ posts: imageUrls });
            });
        });
      }
    });
  }

  render() {
    return (
      <div>
        <ListGroup variant="flush">
          {this.state.posts.map((imageUrl, i) => (
            <Post key={i} src={imageUrl} />
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default PostsList;
