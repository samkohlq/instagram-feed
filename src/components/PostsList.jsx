import React from "react";
import { ListGroup } from "react-bootstrap";
import Post from "./Post";

class PostsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        // "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg?resize=750px:*",
        // "https://images.theconversation.com/files/301743/original/file-20191114-26207-lray93.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip"
      ]
    };
  }

  componentDidMount() {
    fetch(
      "https://us-central1-instagram-feed-1a4be.cloudfunctions.net/widgets/user1/retrievePosts",
      // "http://localhost:5001/instagram-feed-1a4be/us-central1/widgets/user1/retrievePosts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: "user1"
        })
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
