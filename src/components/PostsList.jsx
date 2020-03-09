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

  componentDidMount() {
    fetch(
      "https://us-central1-instagram-feed-1a4be.cloudfunctions.net/widgets/user1/retrievePosts",
      // "http://localhost:5001/instagram-feed-1a4be/us-central1/widgets/user1/retrievePosts",
      {
        method: "GET",
        headers: {
          userId: "user1"
        }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(imageUrls => {
        return this.setState({ posts: imageUrls });
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
