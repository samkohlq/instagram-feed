import firebase from "firebase";
import "firebase/storage";
import React, { Component } from "react";
import { Button, Row } from "react-bootstrap";

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      imageUrl: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = event => {
    if (event.target.files[0]) {
      this.setState({
        image: event.target.files[0]
      });
    }
  };

  handleClick = () => {
    var storageRef = firebase.storage().ref();
    const { image } = this.state;
    console.log(this);
    storageRef
      .child(`images/user1/${image.name}`)
      .put(image)
      .then(async () => {
        const imageUrl = await storageRef
          .child(`images/user1/${image.name}`)
          .getDownloadURL();
        fetch(
          "https://us-central1-instagram-feed-1a4be.cloudfunctions.net/widgets/user1/addPost",
          // "http://localhost:5001/instagram-feed-1a4be/us-central1/widgets/user1/addPost",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId: "user1",
              image: image.name,
              imageUrl
            })
          }
        );
      });
  };

  render() {
    return (
      <Row className="mt-5">
        <input type="file" onChange={this.handleChange} />
        <Button onClick={this.handleClick}>Upload image</Button>
      </Row>
    );
  }
}

export default AddPost;
