import { Button } from "@material-ui/core";
import firebase from "firebase";
import "firebase/storage";
import React, { Component } from "react";

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
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken(true).then(idToken => {
          storageRef
            .child(`images/${user.uid}/${image.name}`)
            .put(image)
            .then(async () => {
              const imageUrl = await storageRef
                .child(`images/${user.uid}/${image.name}`)
                .getDownloadURL();
              fetch(
                `https://us-central1-instagram-feed-1a4be.cloudfunctions.net/widgets/addPost/${user.uid}`,
                // `http://localhost:5001/instagram-feed-1a4be/us-central1/widgets/addPost/${user.uid}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: idToken
                  },
                  body: JSON.stringify({
                    userId: user.uid,
                    image: image.name,
                    imageUrl
                  })
                }
              );
            });
        });
      }
    });
  };

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleChange} />
        <Button variant="outlined" onClick={this.handleClick}>
          Upload image
        </Button>
      </div>
    );
  }
}

export default AddPost;
