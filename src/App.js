import firebase from "firebase";
import "firebase/storage";
import React, { Component } from "react";
import { Button, Container, Row } from "react-bootstrap";
import config from "./firebase-config";

firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }

  handleChange = event => {
    if (event.target.files[0]) {
      this.setState({
        image: event.target.files[0]
      });
    }
  };

  handleUpload = () => {
    console.log(this.state);
    var storageRef = firebase.storage().ref();
    const { image } = this.state;
    storageRef
      .child(`images/user1/${image.name}`)
      .put(image)
      .then(
        fetch(
          "https://us-central1-instagram-feed-1a4be.cloudfunctions.net/widgets/user1/addpost",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              user: "user1",
              image: image.name
            })
          }
        )
      );
  };

  render() {
    return (
      <Container>
        <Row className="mt-5">
          <input type="file" onChange={this.handleChange} />
          <Button onClick={this.handleUpload}>Upload image</Button>
        </Row>
      </Container>
    );
  }
}

export default App;
